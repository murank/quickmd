// lib/markdown.ts

// webpack with node-ts can't resolve synthetic default imports...
import * as marked from 'marked';

import TocBuilder from './toc-builder';

import { highlight } from './highlighter';
import { stripTags, unescapeHtml } from './util';

class CustomRendrer extends marked.Renderer {
  private generatedIds: {[id: string]: number} = {};

  constructor(options?: marked.MarkedOptions) {
    super(options);
  }

  private generateId(text: string): string {
    const escaped = encodeURIComponent(
      text
      .replace(/[\x00-\x1f\x7f!"#$%&'()*+,\./:;<=>?@\[\\\]\^`{|}~]+/g, '')  // remove all control chars and Punctuations (except '-' and '_')
      .replace(/\s+/g, '-') // replace whitespaces to '-'
    ).replace(/%/g, '')     // remove '%' from encoded string
    .toLowerCase()          // convert to lower case
    ;
    let id = escaped;

    let count = this.generatedIds[escaped] || 0;
    if (count > 0) {
      // if the id is duplicated, append unique number;
      id = `${escaped}-${count}`;
    }
    this.generatedIds[escaped] = count + 1;

    return id;
  }

  heading(text: string, level: number, raw: string): string {
    const id = this.generateId(raw);
    return `<h${level} id="${id}"><a href="#${id}">${text}</a></h${level}>\n`;
  }
}

export function compileMarkdown(text: string): string {
  return marked(text, {
    highlight: (code, lang) => (lang ? highlight(code, lang) : code),
    renderer: new CustomRendrer(),
  });
}

export function extractTitle(html: string, defaultTitle: string): string {
  const matched = html.match(/^\s*<h[^>]+>(.*?)<\/h.>/i);
  if (!matched) {
    return defaultTitle;
  }
  return unescapeHtml(stripTags(matched[1]));
}

/**
 * Create TOC from headings(h1...h6) in html text.
 *
 * The TOC has at most 3 levels of the higher (lower number) headings.
 * In other words, if h1 heading doesn't exist, the TOC consists of h2 to h4.
 */
export function createToc(html: string): string {
  let builder = new TocBuilder(html);
  return builder.build();
}

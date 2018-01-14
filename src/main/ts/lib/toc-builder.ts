// lib/toc.ts

import { stripTags, repeatString } from './util';

interface Heading {
  level: number;
  id: string;
  text: string;
}

const INDENT = '  ';

export default class TocBuilder {
  private headings: Heading[];
  private highestLevel: number;
  private index: number;

  constructor(html: string) {
    const headings = this.parse(html);

    this.highestLevel = this.getHighestLevel(headings);
    this.headings = this.filterHeadingsByLevel(headings, this.highestLevel + 3);
  }

  private parse(html: string): Heading[] {
    const regex = /<h(.).+?id="([^"]+)"[^>]*>(.*?)<\/h.>/g;
    const headings: Heading[] = []

    let matched: RegExpExecArray | null;
    while ((matched = regex.exec(html)) !== null) {
      headings.push({
        level: +matched[1],
        id: matched[2],
        text: stripTags(matched[3]),
      });
    }

    return headings;
  }

  build(): string {
    if (this.headings.length === 0) {
      return '';
    }
    this.index = 0;

    let result = '<ul>\n';
    result = this.render(result, this.highestLevel, 1);
    result += '</ul>';

    return result;
  }

  private getHighestLevel(headings: Heading[]): number {
    let result = 99;
    for (let heading of headings) {
      result = Math.min(heading.level, result);
    }
    return result;
  }

  private filterHeadingsByLevel(headings: Heading[], maxLevel: number): Heading[] {
    let result: Heading[] = [];
    for (let heading of headings) {
      if (heading.level < maxLevel) {
        result.push(heading);
      }
    }
    return result;
  }

  private render(result: string, currentLevel: number, numIndents: number): string {
    let indent = repeatString(INDENT, numIndents);

    while (this.index < this.headings.length) {
      const heading = this.headings[this.index];
      if (currentLevel < heading.level) {
        result += `${indent}<li><ul>\n`;
        result = this.render(result, currentLevel + 1, numIndents + 1);
        result += `${indent}</ul></li>\n`
      } else if (currentLevel === heading.level) {
        result += `${indent}<li><a href="#${heading.id}">${heading.text}</a></li>\n`;
        ++this.index;
      } else {
        break;
      }
    }

    return result;
  }
}

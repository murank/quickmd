// lib/modes/editor/markdown-edit-mode.ts

import Context from '../../context';
import { compileMarkdown, createToc, extractTitle } from '../../markdown';
import { throttle } from '../../util';

import AbstractEditorMode from './abstract-editor-mode';

export default class MarkdownEditMode extends AbstractEditorMode {

  private static readonly DEFAULT_TITLE = __("Untitled");

  markdown: string;
  html: string;
  toc: string;

  valve = throttle(100);

  constructor(context: Context) {
    super(context);

    this.markdown = this.controls.markdown.text();
    this.html = this.controls.contentPane.html();
  }

  onInput(value: string): void {
    this.markdown = value;

    this.html = compileMarkdown(value);
    this.toc = createToc(this.html);

    this.valve(() => {
      this.controls.contentPane.replaceInnerHTML(this.html);
      this.controls.tocPane.replaceInnerHTML(this.toc);
    });

    this.emit('markdown.updated', extractTitle(this.html, MarkdownEditMode.DEFAULT_TITLE));
  }

  doActivate(): void {
    this.controls.mdTab.addClass('active');
    this.controls.cssTab.removeClass('active');

    this.updateEditor(this.markdown);
  }
}

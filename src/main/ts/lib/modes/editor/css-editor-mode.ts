// lib/modes/editor/css-edit-mode.ts

import Context from '../../context';

import AbstractEditorMode from './abstract-editor-mode';

export default class CssEditMode extends AbstractEditorMode {

  private static readonly DEFAULT_CONTENT = `/* ${__("Put your custom CSS here")} */\n\n`;
  userStyle: string;

  constructor(context: Context) {
    super(context);

    this.userStyle = this.controls.userStyle.text();
  }

  onInput(value: string): void {
    this.userStyle = value;
    this.controls.userStyle.text(this.userStyle);

    this.emit('css.updated');
  }

  doActivate() {
    this.controls.mdTab.removeClass('active');
    this.controls.cssTab.addClass('active');

    this.updateEditor(this.userStyle || CssEditMode.DEFAULT_CONTENT);
  }
}

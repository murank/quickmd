// lib/modes/global/edit-mode.ts

import Context from '../../context';
import { KeyCodes } from '../../hotkey';

import AbstractMode from '../abstract-mode';

import CssEditorMode from '../editor/css-editor-mode';
import EditorMode from '../editor/editor-mode';
import MarkdownEditorMode from '../editor/markdown-editor-mode';

export default class EditMode extends AbstractMode {

  private currentMode: EditorMode;

  private markdownMode: MarkdownEditorMode;
  private cssMode: CssEditorMode;

  constructor(context: Context) {
    super(context);

    this.markdownMode = new MarkdownEditorMode(context);
    this.cssMode = new CssEditorMode(context);

    this.controls.mdTab.on('click', () => this.openMarkdownTab());
    this.controls.cssTab.on('click', () => this.openCssTab());
    this.controls.editor.on('keydown', (e: KeyboardEvent) => this.onKeyDown(e));
  }

  get userStyle(): string {
    return this.cssMode.userStyle;
  }

  get html(): string {
    return this.markdownMode.html;
  }

  get toc(): string {
    return this.markdownMode.toc;
  }

  get markdown(): string {
    return this.markdownMode.markdown
  }

  activate(): void {
    this.controls.editButton.text(`${__('Preview')}(Ctrl+E)`);
    this.addClasses({
      body: 'inEdit',
    });

    this.controls.editor.on('input', () => {
      this.onInput();
    });

    this.changeMode(this.markdownMode);
  }

  openMarkdownTab(): void {
    this.changeMode(this.markdownMode);
  }

  openCssTab(): void {
    this.changeMode(this.cssMode);
  }

  changeMode(newMode: EditorMode): void {
    if (this.currentMode === newMode) {
      return;
    }
    if (this.currentMode) {
      this.currentMode.deactivate();
    }

    this.currentMode = newMode;
    this.currentMode.activate();
  }

  onInput(): void {
    const val = this.controls.editor.val();
    this.currentMode.onInput(val);
  }

  onKeyDown(e: KeyboardEvent): void {
    if (e.keyCode !== KeyCodes.TAB) {
      return;
    }
    e.preventDefault();

    const textarea = <HTMLTextAreaElement>e.target;
    this.insertTab(textarea);
    this.onInput();
  }

  private insertTab(textarea: HTMLTextAreaElement): void {
    const val = textarea.value;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    textarea.value = `${val.substr(0, start)}\t${val.substr(end)}`;

    textarea.selectionStart = textarea.selectionEnd = start + 1;
  }
}

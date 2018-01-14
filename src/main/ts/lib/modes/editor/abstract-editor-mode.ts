// lib/modes/editor/abstract-editor-mode.ts

import Context from '../../context';
import EventBus, { EventType } from '../../event-bus';

import AbstractMode from '../abstract-mode';

import EditorMode from './editor-mode';

export default abstract class AbstractEditorMode
  extends AbstractMode
  implements EditorMode {

  private selection: {start: number, end: number};

  constructor(context: Context) {
    super(context);
  }

  protected updateEditor(value: string): void {
    this.controls.editor.val(value);
  }

  protected emit(event: EventType): void;
  protected emit(event: EventType, ...args: any[]): void;
  protected emit(event: EventType, args?: any[]): void {
    EventBus.prototype.emit.apply(this.context.eventbus, arguments);
  }

  activate(): void {
    this.doActivate();

    const editor = this.controls.editor;
    editor.select(this.selection);
    editor.focus();
  }

  abstract doActivate(): void;

  deactivate(): void {
    this.selection = this.controls.editor.select();
  }

  // from EditorMode interface
  abstract onInput(value: string): void;
}

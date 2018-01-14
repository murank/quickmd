// lib/modes/editor/editor-mode.ts

import Mode from '../mode';

interface EditorMode extends Mode {

  deactivate(): void;
  onInput(value: string): void;

}
export default EditorMode;

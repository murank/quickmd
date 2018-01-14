// lib/modes/global/preview-mode.ts

import Context from '../../context';

import AbstractMode from '../abstract-mode';

export default class PreviewMode extends AbstractMode {
  constructor(context: Context) {
    super(context);
  }

  activate() {
    this.controls.editButton.text(`${__('Edit')}(Ctrl+E)`);
    this.removeClasses({
      body: 'inEdit',
    });
  }
}

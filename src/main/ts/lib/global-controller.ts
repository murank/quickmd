// lib/GlobalController.ts

import ContentSaver from './content-saver';
import Control from './control';
import Controls from './controls';
import Context from './context';
import { addEventListener } from './dom-event'
import { KeyCodes } from './hotkey';

import EditMode from './modes/global/edit-mode';
import PreviewMode from './modes/global/preview-mode';
import Mode from './modes/mode';

export default class GlobalController {

  private contentSaver = new ContentSaver();

  private context: Context;
  private currentMode: Mode;

  private editMode: EditMode;
  private previewMode: PreviewMode;

  private currentTitle: string;
  private isModified: boolean;

  private get controls(): Controls {
    return this.context.controls;
  }

  mount() {
    this.context = new Context({
      body: Control.byUniqueTagName('body'),
      title: Control.byUniqueTagName('title'),

      editButton: Control.byId('edit'),
      saveButton: Control.byId('save'),

      editor: Control.byId('editor'),
      markdown: Control.byId('markdown'),
      userStyle: Control.byId('userStyle'),

      contentPane: Control.byId('contentPane'),
      tocPane: Control.byId('tocPane'),
      editorPane: Control.byId('editorPane'),

      mdTab: Control.byId('mdTab'),
      cssTab: Control.byId('cssTab'),
    });

    this.initModes(this.context);
    this.initEventListener(this.context);
    this.initHotKeys(this.context);

    this.currentTitle = this.controls.title.text();
    this.isModified = false;

    this.changeMode(this.previewMode);
    Control.byClassName('cloak').forEach(c => c.removeClass('cloak'));
  }

  initModes(context: Context) {
    this.editMode = new EditMode(context);
    this.previewMode = new PreviewMode(context);
  }

  initEventListener(context: Context) {
    addEventListener(window, 'beforeunload', (e: BeforeUnloadEvent) => { return this.onBeforeUnload(e) });

    const controls = context.controls;
    controls.editButton.on('click', () => this.toggleEdit());
    controls.saveButton.on('click', () => this.save());

    const eventbus = context.eventbus;
    eventbus.on('markdown.updated', (title: string) => this.onMarkdownUpdated(title));
    eventbus.on('css.updated', () => this.onCSSUpdated());
  }

  initHotKeys(context: Context): void {
    const controls = context.controls;
    controls.editButton.hotKey(KeyCodes.E, true);
    controls.saveButton.hotKey(KeyCodes.S, true);
  }

  changeMode(newMode: Mode) {
    if (this.currentMode === newMode) {
      return;
    }

    this.currentMode = newMode;
    this.currentMode.activate();
  }

  toggleEdit() {
    const nextMode = (this.currentMode === this.editMode ? this.previewMode : this.editMode);
    this.changeMode(nextMode);
  }

  save() {
    this.contentSaver.save(`${this.currentTitle}.html`, {
      title: this.currentTitle,
      style: this.editMode.userStyle,
      html: this.editMode.html,
      toc: this.editMode.toc,
      markdown: this.editMode.markdown,
    });

    this.isModified = false;
    this.updateTitle();
  }

  onBeforeUnload(e: BeforeUnloadEvent): string | void {
    if (!this.isModified) {
      return;
    }
    const message = __('The data is not saved.\nDo you want to move from this page?');
    e.returnValue = message;
    return message;
  }

  onMarkdownUpdated(title: string) {
    this.currentTitle = title;
    this.onModified()
  }

  onCSSUpdated() {
    this.onModified()
  }

  private onModified() {
    this.isModified = true;
    this.updateTitle();
  }

  private updateTitle() {
    const newTitle = `${this.isModified ? '(*)' : ''}${this.currentTitle}`;
    this.controls.title.text(newTitle);
  }
}

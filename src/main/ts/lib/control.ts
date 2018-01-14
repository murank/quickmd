// lib/control.ts

import { addEventListener } from './dom-event';
import { addHotKey } from './hotkey';
import { unescapeHtml } from './util';

type Selection = {
  start: number;
  end: number;
}

/**
 * Common interface to tweak HTMLElement(s) easlily.
 */
export default class Control {

  static byId(id: string): Control {
    const target = document.getElementById(id);
    if (!target) {
      throw new Error(`element not found: ${id}`);
    }
    return new Control(target);
  }

  static byClassName(clazz: string): Control[] {
    const targets = document.getElementsByClassName(clazz);
    const result = [];
    for (let i = 0; i < targets.length; ++i) {
      result.push(new Control(targets[i]));
    }
    return result;
  }

  static byUniqueTagName(tagName: string): Control {
    const targets = document.getElementsByTagName(tagName);
    if (targets.length == 0) {
      throw new Error(`element not found: ${tagName}`);
    }
    return new Control(targets[0]);
  }

  private constructor(public target: Element) {
  }

  private get classList() {
    return this.target.classList;
  }

  click(): void {
    (<HTMLElement>this.target).click();
  }

  focus(): void {
    (<HTMLElement>this.target).focus();
  }

  select(): Selection;
  select(selection: Selection): void;
  select(selection?: Selection): Selection | void {
    const elm = <HTMLTextAreaElement>this.target;
    if (selection === undefined) {
      return {start: elm.selectionStart, end: elm.selectionEnd};
    }
    elm.selectionStart = selection.start;
    elm.selectionEnd = selection.end;
  }

  on(event: string, listener: EventListener): void {
    addEventListener(this.target, event, listener);
  }

  hotKey(keyCode: number, ctrl?: boolean): void {
    addHotKey(<HTMLElement>this.target, keyCode, ctrl);
  }

  disabled(value: boolean): void {
    (<any>this.target).disabled = value;
  }

  visible(value: boolean): void {
    if (value) {
      this.removeClass('hidden');
    } else {
      this.addClass('hidden');
    }
  }

  addClass(className: string) {
    this.classList.add(className);
  }

  removeClass(className: string): void {
    this.classList.remove(className);
  }

  val(): string;
  val(value: string): void;
  val(value?: string): string | void {
    if (value === undefined) {
      return (<any>this.target).value;
    }
    (<any>this.target).value = value;
  }

  text(): string;
  text(value: string): void;
  text(value?: string): string | void {
    if (value === undefined) {
      return unescapeHtml(this.target.textContent || '');
    }
    this.target.textContent = value;
  }

  html(): string;
  html(value: string): void;
  html(value?: string): string | void {
    if (value === undefined) {
      return (<any>this.target).innerHTML;
    }
    (<any>this.target).innerHTML = value;
  }

  /**
   * Update innerHTML by replacing DOM Element.
   *
   * NB: After calling this method, associated event listeners will be removed.
   */
  replaceInnerHTML(html: string): void {
    const scrollTop = this.target.scrollTop;

    const newElement: Element = <Element>this.target.cloneNode(false);
    newElement.innerHTML = html;
    this.target.parentNode!.replaceChild(newElement, this.target);

    this.target = newElement;
    this.target.scrollTop = scrollTop;
  }
}

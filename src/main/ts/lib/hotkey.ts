// lib/hotkey.ts

import { addEventListener } from './dom-event';

export const enum KeyCodes {
  TAB = 9,
  E = 69,
  S = 83,
}

type KeyConfig = {
  keyCode: number;
  ctrl?: boolean;
}

interface HotkeyConfig extends KeyConfig {
  target: HTMLElement;
}

class KeyDownEventDispatcher {
  private hotKeys: {[keyCode: number]: HotkeyConfig[]} = {};
  private repeat: {[keyCode: number]: boolean} = {};

  add(target: HTMLElement, keyCode: number, ctrl?: boolean): void {
    let hotKeys = this.hotKeys[keyCode];
    if (!hotKeys) {
      hotKeys = this.hotKeys[keyCode] = [];
    }
    hotKeys.push({
      keyCode: keyCode,
      ctrl: ctrl,
      target: target,
    });
  }

  onKeyDown(e: KeyboardEvent): void {
    const keyCode = e.keyCode;
    const hotKeys = this.hotKeys[keyCode];
    if (!hotKeys || this.repeat[keyCode]) {
      return;
    }
    this.repeat[keyCode] = true;

    for (let config of hotKeys) {
      if ((config.ctrl === undefined) || (config.ctrl === e.ctrlKey)) {
        e.preventDefault();
        config.target.click();
      }
    }
  }

  onKeyUp(e: KeyboardEvent): void {
    const keyCode = e.keyCode;
    if (!this.hotKeys[keyCode]) {
      return;
    }
    this.repeat[keyCode] = false;
  }
}

const instance = new KeyDownEventDispatcher();
addEventListener(document, 'keydown', (e: KeyboardEvent) => instance.onKeyDown(e));
addEventListener(document, 'keyup', (e: KeyboardEvent) => instance.onKeyUp(e));

export function addHotKey(target: HTMLElement, keyCode: KeyCodes, ctrl?: boolean): void {
  instance.add(target, keyCode, ctrl);
}

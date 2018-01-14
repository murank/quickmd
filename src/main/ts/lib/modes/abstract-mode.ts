// lib/modes/abstract-mode.ts

import Context from '../context';
import Control from '../control';
import Controls from '../controls';

import Mode from './mode';

type ControlProps<T> = {[c in keyof Controls]?: T};

export default abstract class AbstractMode implements Mode {
  constructor(protected context: Context) {
  }

  protected get controls(): Controls {
    return this.context.controls;
  }

  private forEach<T>(values: ControlProps<T>, func: (control: Control, value: T) => void): void {
    for (let i = 0, keys = Object.keys(values); i < keys.length; ++i) {
      let c = keys[i];
      func((<any>this.controls)[c], (<any>values)[c]);
    }
  }

  protected disableControls(values: ControlProps<boolean>): void {
    this.forEach(values, (control, value) => control.disabled(value));
  }

  protected showControls(values: ControlProps<boolean>): void {
    this.forEach(values, (control, value) => control.visible(value));
  }

  protected addClasses(values: ControlProps<string>): void {
    this.forEach(values, (control, value) => control.addClass(value));
  }

  protected removeClasses(values: ControlProps<string>): void {
    this.forEach(values, (control, value) => control.removeClass(value));
  }

  abstract activate(): void;
}

// lib/event-bus.ts

type CallbackType = (...args: any[]) => any;
export type EventType = 'markdown.updated' | 'css.updated';

export default class EventBus {

  listeners: {[event: string]: Function[]} = {}

  on(event: EventType, callback: CallbackType) {
    let listeners = this.listeners[event];
    if (listeners === undefined) {
      listeners = this.listeners[event] = [];
    }
    listeners.push(callback);
  }

  emit(event: EventType, ...args: any[]) {
    const listeners = this.listeners[event] || [];
    for (let listener of listeners) {
      listener(...args);
    }
  }
}

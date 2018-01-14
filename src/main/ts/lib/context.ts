// lib/context.ts

import Controls from './controls';
import EventBus from './event-bus';

export default class Context {
  eventbus = new EventBus();

  constructor(public controls: Controls) {
  }
}

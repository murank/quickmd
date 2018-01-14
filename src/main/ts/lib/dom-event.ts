// lib/event.ts

class EventListenerHolder {
  constructor(private target: Window | Document | Element, private event: string, private listener: EventListener) {
  }

  attach() {
    this.target.addEventListener(this.event, this.listener);
  }
  detach() {
    this.target.removeEventListener(this.event, this.listener);
  }
}

const holders: EventListenerHolder[] = [];

export function addEventListener(target: Window | Document | Element, event: string, listener: EventListener): void {
  const holder = new EventListenerHolder(target, event, listener);
  holder.attach();
  holders.unshift(holder);
}

function removeAllEventListener() {
  for (let holder of holders) {
    holder.detach();
  }
}
addEventListener(window, 'unload', removeAllEventListener);

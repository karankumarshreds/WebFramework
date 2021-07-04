type Callback = () => void;

interface Event {
  [eventName: string]: Callback[];
}

export class Eventing {
  private events: Event = {};

  // add events and their handlers
  on(eventName: string, eventHandler: Callback) {
    const handlers = this.events[eventName] || [];
    handlers.push(eventHandler);
    this.events[eventName] = handlers;
  }

  // trigger events
  trigger(eventName: string) {
    const handlers = this.events[eventName];
    if (!handlers || !handlers.length) {
      return;
    } else {
      handlers.forEach((cb) => {
        cb();
      });
    }
  }
}

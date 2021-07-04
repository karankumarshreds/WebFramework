type Callback = () => void; // type alias

export class Eventing {
  // stores all the different events that get registered
  private events: { [key: string]: Callback[] } = {};

  // event handlers
  // we will use this method to save the event handlers
  on(eventName: string, cb: Callback): void {
    // handlers could be Callback[] or undefined (in case event
    // name does not exist initially as the key in the object)
    // so incase it does not exist, use an empty array
    const handlers = this.events[eventName] || [];
    handlers.push(cb);
    this.events[eventName] = handlers;
  }

  trigger(eventName: string): void {
    const handlers = this.events[eventName];
    if (!handlers || !handlers.length) {
      return;
    }
    // otherwise call each callback
    handlers.forEach((cb) => {
      cb();
    });
  }
}

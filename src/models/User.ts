interface UserProps {
  name?: string;
  age?: number;
}

type Callback = () => void; // type alias

export class User {
  private data: UserProps;
  constructor(data: UserProps) {
    this.data = data;
  }

  // store all the different events that get registered
  private events: { [key: string]: Callback[] } = {};

  // state getter
  get(propName: string): string | number {
    return this.data[propName];
  }

  // state setter
  set(update: UserProps): void {
    // merge with existing state
    Object.assign(this.data, update);
  }

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
}

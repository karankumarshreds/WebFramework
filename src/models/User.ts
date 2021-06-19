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
  on(eventName: string, cb: Callback): void {
    // we need a way to store all the events
  }
}

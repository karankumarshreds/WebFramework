import axios, { AxiosResponse } from 'axios';

interface UserProps {
  id?: number;
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

  fetch(): void {
    axios
      .get(`http://localhost:3000/users/${this.get('id')}`)
      .then((response: AxiosResponse): void => {
        this.set(response.data);
      });
  }

  save(): void {
    const id = this.get('id');
    // if the id property is already there that would mean
    // that the user already exists and we would rather send
    // a PUT request, and if not, we will send a POST request
    if (this.get('id')) {
      axios.put(`http://localhost:3000/users/${id}`, this.data);
    } else {
      axios.post(`http://localhost:3000/users`, this.data);
    }
  }
}

import axios, { AxiosResponse } from 'axios';

interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export class User {
  private data: UserProps;
  constructor(data: UserProps) {
    this.data = data;
  }

  // state getter
  get(propName: string): string | number {
    return this.data[propName];
  }

  // state setter
  set(update: UserProps): void {
    // merge with existing state
    Object.assign(this.data, update);
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

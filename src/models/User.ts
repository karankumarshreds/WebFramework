interface UserProps {
  name: string;
  age: number;
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
}

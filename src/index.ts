import { User } from './models/User';

const user = new User({ name: 'Karan', age: 20 });
console.log(user.get('name'));

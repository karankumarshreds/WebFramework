import { User } from './models/User';

const user = new User({ name: 'Karan', age: 20 });
// we can add multiple event handlers on the user
user.on('change', () => {});
user.on('change', () => {});

console.log(user);

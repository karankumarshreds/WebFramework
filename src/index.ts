import { User } from './models/User';

const user = new User({ name: 'Karan', age: 20 });
// we can add multiple event handlers on the user
user.on('change', () => {
  console.log('change');
});
user.on('save', () => {
  console.log('save');
});

user.trigger('change');
user.trigger('save');

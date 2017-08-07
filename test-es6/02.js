var person = {
  name: 'xiaoming',
  age: 18,
};

let arr = ['itech', 'plus', 1, 2, 3];
let [...item1] = arr;

const {name, age} = person;

// console.log(name);
// console.log(age);
// console.log(item1);
// console.log(item2);

import { name as Name, age as Age} from './m1';
console.log(Name);
console.log(Age);


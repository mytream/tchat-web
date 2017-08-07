let ob1 = {
  name: 'xiaoming',
  age: 18,
};

let obj2 = {
  height,
  ...ob1,
};

// Objecct.assign(obj2, obj1);

console.log(obj2.name);

// obj2.name = obj1.name;
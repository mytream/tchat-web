class Person {
  name = 'xiaoming';

  static validate = () => {
    // 检查格式
    console.log('检查格式');
  };

  handlePress = () => {
    this.name;
  };

  constructor(){
    this.age = 18;
    // this.handlePress = this.handlePress.bind(this);
  }


  render() {
    return (
      <a href=""  onClick={this.handlePress}></a>
    );
  }


}



// Person.validate = function;

const p1 = new Person();

console.log(p1.name);
console.log(Person.validate());

// let p1 = { };
// p1.name = '小明';
// p1['name'] = '小明';
//
// let objKey = 'name';
// p1[objKey] = '小王';
//
// console.log();
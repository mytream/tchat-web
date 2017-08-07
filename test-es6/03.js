// function f1() {
//
// }
//
// function outer() {
//   console.log(this);
//   var f2 = () => {
//     console.log(this);
//   };
//
//   return f2;
// }
//
//
//
//
//
//
// const p1 = {
//   f2: outer(),
// };
//
// p1.f2();

class Outer {

  echo(){


  }

  echo1 = () => {
    console.log(this);
  }

}

new Outer().echo1();


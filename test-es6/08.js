

function getUser() {
  // return Promise.resolve({
  //   name: 'xiao',
  //   age: 18,
  // });

  return new Promise(function (resolve, reject) {
    // http
    resolve({
      name: 'xiao'
    });
    // reject('errr info');
    // throw new Error('err info');
  });
}

// getUser().then(function (person) {
//   console.log(person);
// }).catch((err) => {
//   console.log(err);
// });

async function execProcedure() {
  let person = await getUser();

  console.log(person);
}

execProcedure();





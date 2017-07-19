/**
 * Created by mytream on 17/7/19.
 */

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let db;
async function createMongoConnection() {
  await mongoose.connect('mongodb://localhost/tchat');

  const CatSchema = mongoose.Schema({ name: String });

  CatSchema.methods.speak = function () {
    var greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    console.log(greeting);
  };

  const Cat = mongoose.model('Cat', CatSchema);

  // const kitty = new Cat({ name: 'Kate' });
  // kitty.speak();
  //
  // await kitty.save();
  // kitty.speak();

  let cat = await Cat.findOne().exec();
  // console.log('cat', cat);
  cat.speak();

  let cats = await Cat.find().exec();
  // console.log('cat', cat);
  // cats.speak();
  console.log('cats -- ', cats)
}

createMongoConnection();

// var promise = mongoose.createConnection('mongodb://localhost/tchat', {
//   useMongoClient: true,
//   /* other options */
// });
//
// promise.then(function(db) {
//   /* Use `db`, for instance `db.model()`
//    });
//    // Or, if you already have a connection
//    connection.openUri('mongodb://localhost/myapp', { /* options */
// });
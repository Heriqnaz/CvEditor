const mongoose = require("mongoose");
const Cv = require('./models/cv');

mongoose.connect('mongodb://localhost/userCvs', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Mongo Connected');
}).catch((err) => {
  console.log('Mongo Connect error', err);
});

const seedCvs = [
  {name: 'Heriqnaz'},
  {name: 'Meri'},
  {name: 'Mari'},
  {name: 'Elen'},
  {name: 'Suren'},
  {name: 'Hayk'},
  {name: 'Anush'},
  {name: 'Mike'},
  {name: 'Areg'},

];

const seedDb = async () => {
  await Cv.deleteMany({});
  await Cv.insertMany(seedCvs);
};

seedDb().then(() => {
  console.log('seeds added');
  mongoose.connection.close();
})

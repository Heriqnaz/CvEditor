const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CvSchema = new Schema({
  name: {
    type: String,
  },
  lastName: {
    type: String
  },
  bDay: {
    type: Date
  },
  phoneNumber: {
    type: String
  },
  email: {
    type: String
  },
  createdAt: {type: Date, default: Date.now},
});


const Cv = mongoose.model('cv',CvSchema);

module.exports = Cv;

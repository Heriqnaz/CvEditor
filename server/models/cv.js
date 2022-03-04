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
  skills: {
    type: Array
  },
  job: {
    type: Array
  }
});


const Student = mongoose.model('cv',CvSchema);

module.exports = Student;

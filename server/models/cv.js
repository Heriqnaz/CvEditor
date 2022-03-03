const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CvSchema = new Schema({
  name: {
    type: String,
  },
  lastName: {
    type: String
  },
});


const Student = mongoose.model('cv',CvSchema);

module.exports = Student;

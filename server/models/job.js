const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
  cvId: {
    type: Schema.Types.ObjectId,
  },
  title: {
    type: String
  },
  role: {
    type: String
  },
  details: {
    type: String
  },
  start: {
    type: String
  },
  end: {
    type: String
  },
  createdAt: {type: Date, default: Date.now},
});


const Job = mongoose.model('job', JobSchema);

module.exports = Job;

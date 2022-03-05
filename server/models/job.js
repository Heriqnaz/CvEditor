const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
  cvId: {
    type: [{ type: Schema.Types.ObjectId, ref: 'cv' }],
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
  timeRange: {
    type: String
  },
  createdAt: {type: Date, default: Date.now},
});


const Job = mongoose.model('job', JobSchema);

module.exports = Job;

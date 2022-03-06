const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SkillSchema = new Schema({
  cvId: {
    type: Schema.Types.ObjectId,
  },
  name: {
    type: String
  },
  section: {
    type: String
  },
  createdAt: {type: Date, default: Date.now},
});


const Skill = mongoose.model('skill', SkillSchema);

module.exports = Skill;

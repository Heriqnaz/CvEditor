const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SkillSchema = new Schema({
  cvId: {
    type: [{ type: Schema.Types.ObjectId, ref: 'cv' }],
  },
  name: {
    type: String
  },
  createdAt: {type: Date, default: Date.now},
});


const Skill = mongoose.model('skill', SkillSchema);

module.exports = Skill;

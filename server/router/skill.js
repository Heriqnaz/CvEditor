const express = require('express');
const router = express.Router();
const Skill = require('../models/skill');

router.get('/skillsByCvId/:cvId',(req,res) => {
  Skill.find({cvId: req.params.cvId}).then((skills) => {
    res.send({
      type: 'GET',
      data: skills
    });
  }).catch((err) => {
    console.log('Error:', err)
  });
});

router.post('/saveSkill', (req, res) => {
  console.log('rrrrrrrrrrr', req.body);
  const skill = new Skill(req.body);
  skill.save().then((skill) => {
    console.log('gggggggggggggggg', skill);
    res.send({
      type: 'POST',
      data: skill
    });
  }).catch((err) => {
    console.log('Error:', err)
  });
});

router.delete('/deleteSkillById/:id', (req, res) => {
  Skill.findByIdAndDelete(req.params.id).then((data) => {
    res.send({
      type: 'DELETE',
      message: 'skill deleted'
    });
  }).catch((err) => {
    console.log('Error:', err)
  });
});

module.exports = router;

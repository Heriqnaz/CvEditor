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
  const skill = new Skill(req.body);
  skill.save().then((skill) => {
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
router.delete('/deleteAllSkillsByCvId/:cvId', (req, res) => {
  Skill.deleteMany({cvId: req.params.cvId}).then((data) => {
    res.send({
      type: 'DELETE',
      message: 'All skills deleted'
    });
  }).catch((err) => {
    console.log('Error:', err)
  });
});
router.delete('/deleteAllSavedSkillsBySection/:section/:cvId', (req, res) => {
  Skill.deleteMany({section: req.params.section, cvId: req.params.cvId}).then((data) => {
    res.send({
      type: 'DELETE',
      message: 'All skills deleted'
    });
  }).catch((err) => {
    console.log('Error:', err)
  });
});

module.exports = router;

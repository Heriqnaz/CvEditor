const express = require('express');
const router = express.Router();
const Cv = require('../models/cv');

router.get('/cvs',(req,res) => {
  console.log('999999999999999', Cv)
  Cv.find({}).then((cvs) => {
    res.send(cvs);
  }).catch((err) => {
    console.log('Error:', err)
  });
});
router.get('/getCvById/:id',function(req,res){
  Cv.findOne({_id: req.params.id}).then((cv) => {
    res.send(cv);
  });
});

router.post('/saveCv', (req, res) => {
  console.log('rrrrrrrrrrr', req.body);

  res.send({
    type: 'POST',
    name: req.body.name,
    roll: req.body.roll
  });
});

module.exports = router;

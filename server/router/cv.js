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
  const cvId = req.body.id;
  const query = req.body.data;
  Cv.findByIdAndUpdate(cvId, query).then((cv) => {
    console.log('gggggggggggggggg', cv);
    res.send({
      type: 'POST',
      data: cv
    });
  })
});

module.exports = router;

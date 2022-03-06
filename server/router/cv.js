const express = require('express');
const router = express.Router();
const Cv = require('../models/cv');
const mongoose = require("mongoose");

router.get('/cvs',(req,res) => {
  Cv.find({}).then((cvs) => {
    res.send(cvs);
  }).catch((err) => {
    console.log('Error:', err)
  });
});
router.get('/getCvById/:id',function(req,res){
  Cv.aggregate([
    { $match: { "_id": mongoose.Types.ObjectId(req.params.id) }},
    { $lookup:
        {
          from: 'skills',
          localField: '_id',
          foreignField: 'cvId',
          as: 'skills'
        }
    },
    { $lookup:
        {
          from: 'jobs',
          localField: '_id',
          foreignField: 'cvId',
          as: 'jobs'
        }
    },
    {$limit: 1}
  ]).then((cv) => {
    res.send(cv[0]);
  }).catch((err) => {
    console.log('Error:', err)
  });
});

router.post('/saveCv', (req, res) => {
  const cvId = req.body.id;
  const query = req.body.data;
  Cv.findByIdAndUpdate(cvId, query).then((cv) => {
    res.send({
      type: 'POST',
      data: cv
    });
  })
});

module.exports = router;

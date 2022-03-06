const express = require('express');
const router = express.Router();
const Job = require('../models/job');

router.get('/jobsByCvId/:cvId',(req,res) => {
  Job.find({cvId: req.params.cvId}).then((jobs) => {
    res.send({
      type: 'GET',
      data: jobs
    });
  }).catch((err) => {
    console.log('Error:', err)
  });
});

router.post('/saveJob', (req, res) => {
  const job = new Job(req.body);
  job.save().then((job) => {
    res.send({
      type: 'POST',
      data: job
    });
  }).catch((err) => {
    console.log('Error:', err)
  });
});

router.put('/editJob', (req, res) => {
  const id = req.body._id;
  Job.findByIdAndUpdate(id, req.body.data).then((job) => {
    res.send({
      type: 'PUT',
      data: job
    });
  }).catch((err) => {
    console.log('Error:', err)
  });
});

router.delete('/deleteJobById/:id', (req, res) => {
  Job.findByIdAndDelete(req.params.id).then((data) => {
    res.send({
      type: 'DELETE',
      message: 'job deleted'
    });
  }).catch((err) => {
    console.log('Error:', err)
  });
});

module.exports = router;

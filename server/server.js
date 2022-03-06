const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const routerCv = require('./router/cv')
const routerJob = require('./router/job')
const routerSkill = require('./router/skill')
const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/userCvs');
mongoose.Promise = global.Promise;

app.use(bodyParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({
  origin: '*'
}));
app.use(express.static('public'));
app.use(express.json());


app.use('/api/cv', routerCv);
app.use('/api/job', routerJob);
app.use('/api/skill', routerSkill);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

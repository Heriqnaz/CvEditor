const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const router = require('./router/api')
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


app.use('/api', router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

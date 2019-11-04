const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const users = require('./routes/users');
const dbConfig = require('./config/database');
const app = express();

var jwt = require('jsonwebtoken');

// set app secretkey
app.set('secretKey', 'd83kdai_i}{[[d');

// security middleware
app.use(helmet());

//  connection to mongodb
dbConfig.connection.on('error', console.error.bind(console,'MongoDB connection error:'));


// password 4_Ca&Node


// middle for logging
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// enable cors
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({
        'message' : 'success',
        'data' : null
    });
});

// public route
app.use('/users', users);

// private route

app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});
function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
    if (err) {
      res.json({status:"error", message: err.message, data:null});
    }else{
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  });
  
}
// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function(req, res, next) {
 let err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// handle errors
app.use(function(err, req, res, next) {
 console.log(err);
 
  if(err.status === 404)
   res.status(404).json({message: "Not found"});
  else 
    res.status(500).json({message: "Something looks wrong :( !!!"});
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});



const mongoose = require('mongoose');
const mongoDB = "mongodb://fetchuser:sT3nl44@ds147882.mlab.com:47882/fetchapp";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;

// password  sT3nl44

module.exports = mongoose;
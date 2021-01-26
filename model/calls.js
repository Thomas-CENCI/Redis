var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CallSchema = new Schema({
  date : String,
  duration : Number,
});

module.exports = mongoose.model('Call', CallSchema);
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName : String,
  lastName : String,
  email : {type: String, required: true, index: {unique: true}},
  pswd : {type: String, required: true}
});

UserSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('pswd')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.pswd, salt, function(err, hash) {
          if (err) return next(err);

          // override the cleartext password with the hashed one
          user.pswd = hash;
          next();
      });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.pswd, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
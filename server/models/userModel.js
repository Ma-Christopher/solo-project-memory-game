const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: { type: String, required: [true, 'Please provide a username'], unique: true },
  password: { type: String, required: [true, 'Please provide a password'] },
  gamesPlayed: { type: Number },
});

userSchema.pre('save', function (next) {
  bcrypt.hash(this.password, SALT_WORK_FACTOR, (err, hash) => {
    if (err) throw new Error(err.message);
    this.password = hash;
    return next();
  });
});

module.exports = mongoose.model('User', userSchema);

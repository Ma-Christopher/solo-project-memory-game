const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const userController = {};

/**
 * getAllUsers - retrieve all users from the database and stores it into res.locals
 * before moving on to next middleware.
 */
userController.getAllUsers = (req, res, next) => {
  User.find({}, (err, users) => {
    // if a database error occurs, call next with the error message passed in
    // for the express global error handler to catch
    if (err) return next('Error in userController.getAllUsers: ' + JSON.stringify(err));

    // store retrieved users into res.locals and move on to next middleware
    res.locals.users = users;
    return next();
  });
};

/**
 * createUser - create and save a new User into the database.
 */
userController.createUser = (req, res, next) => {
  const { username, password } = req.body;
  User.create({ username, password, gamesPlayed: 0 })
    .then((response) => {
      res.locals.userId = response._id;
      res.locals.username = response.username;
      res.locals.gamesPlayed = response.gamesPlayed;
      return next();
    })
    .catch((err) => next(err));
};

/**
 * verifyUser - Obtain username and password from the request body, locate
 * the appropriate user in the database, and then authenticate the submitted password
 * against the password stored in the database.
 */
userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .then(async (response) => {
      if (response) {
        const isMatch = await bcrypt.compare(password, response.password);
        if (isMatch) {
          res.locals.userId = response._id;
          res.locals.username = response.username;
          res.locals.gamesPlayed = response.gamesPlayed;
          return next();
        }
      }
      // invalid login
      res.send({ verified: false, username: response.username });
    })
    .catch((err) => next(err));
};

userController.updateUserData = (req, res, next) => {
  const { username } = req.params;
  User.findOneAndUpdate({ username }, { $inc: { gamesPlayed: 1 } }, { new: true })
    .then(async (response) => {
      res.locals.gamesPlayed = response.gamesPlayed;
      return next();
    })
    .catch((err) => next(err));
};

module.exports = userController;

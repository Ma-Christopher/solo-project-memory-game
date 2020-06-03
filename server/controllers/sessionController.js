const Session = require('../models/sessionModel');

const sessionController = {};

/**
 * isLoggedIn - find the appropriate session for this request in the database, then
 * verify whether or not the session is still valid.
 */
sessionController.isLoggedIn = async (req, res, next) => {
  Session.findOne({ cookieId: req.cookies.ssid })
    .then((response) => {
      if (response) {
        return next();
      }
      res.send('redirect to /register');
    })
    .catch((err) => next(err));
};

/**
 * startSession - create and save a new Session into the database.
 */
sessionController.startSession = (req, res, next) => {
  Session.create({ cookieId: res.locals.userId })
    .catch((err) => next(err));
  return next();
};

module.exports = sessionController;

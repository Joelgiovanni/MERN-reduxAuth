const JwtStrategy = require('passport-jwt').Strategy; // Passport strategy for dealing with JWT
const ExtractJWt = require('passport-jwt').ExtractJwt; // Requried for pulling the Token out of request
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

const opts = {}; // The following lines will fill up this empty object
opts.jwtFromRequest = ExtractJWt.fromAuthHeaderAsBearerToken(); // When the token is set as the Auth Header in the request. This will extract it
opts.secretOrKey = keys.secretOrKey; // Another security thing. Must be the same key that was used in the tokens payload

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      // The payload holds the user id in it. We will use that to find the User in the database
      User.findById(jwt_payload.id).then(user => {
        if (user) {
          // Return the entire user if found || The user will only be found if the token exists && !expired
          return done(null, user);
        } else {
          // No user means there was no token or it was valid/expired
          return done(null, false);
        }
      });
    })
  );
};

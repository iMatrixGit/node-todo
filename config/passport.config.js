const LocalStrategy = require('passport-local').Strategy;
const Users = require('../models/userModel');

module.exports = passport => {
    passport.serializeUser((user, done) =>  {
        return done(null, user);
    });
    passport.deserializeUser((user, done) => {
        return done(null, user);
    });

    // Signup strategy
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, (username, password, done) => {
        Users.findOne({ username }, (err, user) => {
            if (err) {
                return done(err);
            }

            if (user) {
                return done(null, false, { message: 'Username already in use.' });
            }

            return done(null, { username, password });
        });
    }));

    // Signin strategy
    passport.use('local-signin', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
    }, (username, password, done) => {
        Users.findOne({ username }, (err, user) => {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, { message: 'Invalid username' });
            }

            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Invalid password' });
            }

            return done(null, { username, password });
        });
    }))
};
'use strict';

// This module will be executed in app.js.

// module for creating a hash of passwords
const bCrypt = require('bcrypt-nodejs');
const passport = require('passport');

// initialize the passport-local strategy
const { Strategy } = require('passport-local');
let User = null;

// Then define our custom strategies with our instance of the LocalStrategy.

//******************** Registration authetication. Takes two args *************************
const RegistrationStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true 
  },
  // arg2 callback, handle storing a user's details.
  (req, email, password, done) => {
    console.log('local strat callback: password', email);
    User = req.app.get('models').User;

    const generateHash = (password) => {
      return bCrypt.hashSync(password, bCrypt.genSaltSync(8)); 
    };

    //check to see if the user already exists, and if not, add them.
    User.findOne({
      where: {email} 
    }).then( (user) => {
      if (user) {
        console.log('user found, oops');
        return done(null, false, {
          message: 'That email is already taken'
        });
      } else {
          console.log('in the else');
          const userPassword = generateHash(password); 
          const data =
            // values come from the req.body, added by body-parser when register form request is submitted
            {
              email,
              password: userPassword,
              username: req.body.username,
              first_name: req.body.first_name,
              last_name:  req.body.last_name
            };
          User.create(data).then( (newUser, created) => {
            if (!newUser) {
              return done(null, false);
            }
            if (newUser) {
              console.log('newUser', newUser);
              return done(null, newUser);
            }
          });
        }
    });
  }
);


// login authentication ****************************************
//LOCAL SIGNIN
const LoginStrategy = new Strategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true 
  },
  (req, email, password, done) => {
    User = req.app.get('models').User;
    const isValidPassword = (userpass, password) => {
      return bCrypt.compareSync(password, userpass);
    };

    User.findOne({where: {email}})
    .then( (user) => {
      if (!user) {
        return done(null, false, {
          message: "Can't find a user with those credentials. Please try again."
        });
      }
      if (req.body.username != user.username ) {
        return done(null, false, {
          message: 'Wrong username. Please try again'
        });
      }
      if (!isValidPassword(user.password, password)) {
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }
      const userinfo = user.get();
      return done(null, userinfo);
    })
    .catch( (err) => {
      console.log("Error:", err);
      return done(null, false, {
        message: 'Something went wrong with your sign in'
      });
    });
  }
);

passport.serializeUser( (user, done) => {
  console.log('hello, serialize');

  done(null, user);
});

// deserialize user
passport.deserializeUser( ({id}, done) => {
  User.findById(id).then( (user) => {
    if (user) {
        done(null, user.get());
    } else {
        done(user.errors, null);
    }
  });
});

passport.use('local-signup', RegistrationStrategy);
passport.use('local-signin', LoginStrategy);
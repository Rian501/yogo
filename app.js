"use strict";

const express = require("express");
const app = express();
const passport = require("passport");
var session = require("express-session");
let bodyParser = require("body-parser");
const flash = require("express-flash");

require("dotenv").config();
const port = process.env.PORT || 8080;

app.set("models", require("./models"));
// reminder: in controllers, use const { Computer } = req.app.get('models');

app.set("view engine", "pug");
// app.locals.myMoves = getMyMoves; 


app.use('/public', express.static(__dirname + "/public"));

let routes = require("./routes/");

// Begin middleware stack
// Inject session persistence into middleware stack
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
); // session secret

//execute passport strategies file
require("./config/passport-strat.js");
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use((req, res, next) => {
  res.locals.session = req.session;
  // console.log('res.locals.session', res.locals.session);
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());

// note that this needs to be after the above stuff
app.use(routes);

// 404 error handler
app.use((req, res, next) => {
  let error = new Error("sorry, not found.");
  error.status = 404;
  next(error);
});

// Add error handler to pipe all server errors to from the routing middleware
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500);
  res.json({
    message: "A problem occurred.",
    err: err
  });
});

module.exports = app;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

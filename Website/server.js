const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const app = express();
const port = process.env.PORT || 3000;

// Middleware to initialize passport
app.use(passport.initialize());

// Dummy strategy for demonstration
passport.use(new LocalStrategy((username, password, done) => {
  // Here you would usually check the user credentials in the database
  if (username === 'user' && password === 'password') {
    return done(null, { username: 'user' });
  } else {
    return done(null, false);
  }
}));

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

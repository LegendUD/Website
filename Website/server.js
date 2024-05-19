const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Passport local strategy
passport.use(new LocalStrategy((username, password, done) => {
  // Dummy user authentication (replace with actual DB check)
  if (username === 'user' && password === 'password') {
    return done(null, { username: 'user' });
  } else {
    return done(null, false);
  }
}));

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.username);
});

// Deserialize user
passport.deserializeUser((username, done) => {
  // Dummy user deserialization (replace with actual DB check)
  done(null, { username: 'user' });
});

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/stocks', async (req, res) => {
  try {
    const response = await axios.get('https://api.example.com/stocks'); // Replace with actual API URL
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching stock prices');
  }
});

app.get('/news', async (req, res) => {
  try {
    const response = await axios.get('https://api.example.com/news'); // Replace with actual API URL
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching news');
  }
});

app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

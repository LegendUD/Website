const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/stocks', async (req, res) => {
  try {
    const response = await axios.get('API_URL_FOR_STOCKS');
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching stock prices');
  }
});

app.get('/news', async (req, res) => {
  try {
    const response = await axios.get('API_URL_FOR_NEWS');
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching news');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bcrypt = require('bcrypt');

// Session middleware
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Configure passport-local to use account model for authentication
passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      // Replace with your user lookup logic
      const user = await getUserByUsername(username); // Assume this function fetches user by username

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect password.' });
      }
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Replace with your user lookup logic
  getUserById(id).then(user => {
    done(null, user);
  }).catch(err => {
    done(err, null);
  });
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

// Add user registration route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);

  // Save the new user to the database (replace with your database logic)
  await saveUser({ username, passwordHash });

  res.redirect('/login');
});
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define user schema and model
const userSchema = new mongoose.Schema({
  username: String,
  passwordHash: String
});

const User = mongoose.model('User', userSchema);

// Replace getUserByUsername and getUserById with actual database queries
async function getUserByUsername(username) {
  return await User.findOne({ username });
}

async function getUserById(id) {
  return await User.findById(id);
}

async function saveUser(user) {
  const newUser = new User(user);
  return await newUser.save();
}

require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const session = require('express-session');
const flash = require('express-flash');
const MongoStore = require('connect-mongo');
const passport = require('passport');

const app = express();

const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');

// Database connection
const url = 'mongodb://localhost/pizza';
mongoose.connect(url)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log('Failed to connect to MongoDB:', err));

// Session store
let mongoStore = MongoStore.create({
  mongoUrl: url,
  collectionName: 'sessions'
});

// Session config
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  store: mongoStore,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hours
}));


// Passport config
const passportInit = require('./app/config/passport');
passportInit(passport);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Flash messages
app.use(flash());

// Assets
app.use(express.static('public')); // Serves static files from the public folder

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Global middleware
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user;
  next();
});

// Set template engine
app.use(expressLayouts);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

// Routes
require('./routes/web')(app);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

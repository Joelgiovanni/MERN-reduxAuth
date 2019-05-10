const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport'); // "Passport's sole purpose is to authenticate requests, which it does through an extensible set of plugins known as strategies."
const router = require('./routing/routes'); // This is briniging in the routes from the routing file to use here
const cors = require('cors');

// Initialize app()
app = express();

// Secret Key for the Database config
database = require('./config/keys').URI;

// Connecting to the DB
mongoose
  .connect(database, {
    useNewUrlParser: true,
    // sets how many times to try reconnecting
    reconnectTries: Number.MAX_VALUE,
    // sets the delay between every retry (milliseconds)
    reconnectInterval: 1000
  })
  .then(() => console.log('Database is connected'))
  .catch(err => console.log(err));

// Cors set up for cross Domain requests
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true // enable set cookie
  })
);

// Body parser to extract JSON and be able to work with it
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport middleware! Important! Authentication will not work without initializing it and setting the config on the line after
app.use(passport.initialize());
// Passport config. This file is where we will set up our strategy and all that good stuff
require('./config/passport')(passport);

// Routes && Router
app.use('/api', router);

const port = 5000 || process.env.PORT;

app.listen(port, () => console.log(`Server is running on port ${port}`));

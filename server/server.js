const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routing/routes'); // This is briniging in the routes from the routing file to use here

// Initialize app()
app = express();

// Secret Key for the Database config
database = require('./config/keys').URI;

// Connecting to the DB
mongoose
  .connect(database, { useNewUrlParser: true })
  .then(() => console.log('Database is connected'))
  .catch(err => console.log(err));

// Body parser to extract JSON and be able to work with it
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes && Router
app.use('/api', router);

const port = 5000 || process.env.PORT;

app.listen(port, () => console.log(`Server is running on port ${port}`));

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../scripts/db');
const loginRoute = require('../routes/login');
const accountRoute = require('../routes/account');
const itemRoute = require('../routes/item');
const accountGroupRoute=require('../routes/accountGroup');



const app = express();

// Middleware to parse JSON and form data
app.use(express.json());
app.use(cors());
app.options('*', cors());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to the SQL Server
db.connect
  .then(() => {
    app.use('/', loginRoute,accountRoute,itemRoute,accountGroupRoute);

    // Start the Express server after connecting to the database
    app.listen(5500, () => {
      console.log('Server is running...');
    });
  })
  .catch((err) => { 
    console.error(err);
  });
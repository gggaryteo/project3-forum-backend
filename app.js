// import packages
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// import models
const db = require('./models');
const {user, post, tag, comment } = db;

// Putting express & cors together below this line
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// PORT
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
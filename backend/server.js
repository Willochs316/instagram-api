const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./Middleware/ErrorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

connectDB();
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use('/api/userSignup', require('./routes/SignupUserRoutes'));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server started at port  ${port}`);
});

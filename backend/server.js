const express = require('express');
const colors = require('colors');
const cors = require('cors')
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
app.use(cors())

app.use('/users',  require('./routes/users.routes'))

app.use('/api/user', require('./routes/SignupUserRoutes'));


app.use(errorHandler);

app.listen(port, () => {
  console.log(`server started at port  ${port}`);
});

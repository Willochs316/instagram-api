const mongoose = require('mongoose');

const signupSchema = mongoose.Schema(
  {
    mobileNumberOrEmail: {
      type: String,
      required: [true, 'Please add a mobile number or a valid email'],
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
      text: {
      type: String,
      required: [false, 'Please add a text value'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('SignUp', signupSchema);

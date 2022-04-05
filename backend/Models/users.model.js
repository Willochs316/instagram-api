const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
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
      required: [true, 'Please add a password'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('UserModel', userSchema);

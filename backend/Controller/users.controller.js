const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const UserModel = require('../Models/users.model');
const usersModel = require('../Models/users.model');

const createUser = asyncHandler(async (req, res) => {
  try {
    const { mobileNumberOrEmail, password } = req.body;

    //check if user exists
    const userExists = await UserModel.findOne({
      mobileNumberOrEmail,
    });

    if (userExists) {
      return res.status(400).json({
        message: 'Email or mobile already in use',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new UserModel({
      ...req.body,
      password: hashedPassword,
    });

    await user.save();

    return res.status(200).json({
      _id: user.userId,
      mobileNumberOrEmail: user.mobileNumberOrEmail,
      token: generateToken(user.userId),
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  try {
    const { mobileNumberOrEmail, password } = req.body;

    const user = await usersModel.findOne({ mobileNumberOrEmail });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.userId,
        mobileNumberOrEmail: user.mobileNumberOrEmail,
        token: generateToken(user.userId),
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const allUsers = await UserModel.find();
  res.status(200).json(allUsers);
});

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  createUser,
  updateUser,
  getUsers,
};

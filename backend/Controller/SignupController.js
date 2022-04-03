const asyncHandler = require('express-async-handler');

const SignUp = require('../Models/users.model');

const getSignup = asyncHandler(async (req, res) => {
  const signupUsers = await SignUp.find();

  res.status(200).json(signupUsers);
});

const setSignup = asyncHandler(async (req, res) => {
 

  // if (
  //   !req.body.mobileNumberOrEmail ||
  //   !req.body.fullName ||
  //   !req.body.username ||
  //   !req.body.password
  // ) {
  //   res.status(400);
  //   throw new Error('Please add a text field');
  // }

  // const signupUser = await SignUp.create({
  //   mobileNumberOrEmail: req.body.mobileNumberOrEmail,
  //   fullName: req.body.fullName,
  //   username: req.body.username,
  //   password: req.body.password
  // });

  // res.status(200).json(signupUser);

  try {
    const signupUser = await SignUp.create({
      mobileNumberOrEmail: req.body.mobileNumberOrEmail,
      fullName: req.body.fullName,
      username: req.body.username,
      password: req.body.password
    });

    res.status(200).json(signupUser);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

const updateSignup = asyncHandler(async (req, res) => {
  const signupUser = await SignUp.findById(req.params.id);

  if (!signupUser) {
    res.status(400);
    throw new Error('User not found');
  }

  const updatedSignUpUser = await SignUp.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedSignUpUser);
});

const deleteSignup = asyncHandler(async (req, res) => {
  const signupUser = await SignUp.findById(req.params.id);

  if (!signupUser) {
    res.status(400);
    throw new Error('User not found');
  }

  await SignUp.remove();

  res.status(200).json({
    message: 'Delete Signup Details',
  });
});

module.exports = {
  getSignup,
  setSignup,
  updateSignup,
  deleteSignup,
};

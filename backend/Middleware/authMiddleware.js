const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const UserModel = require('../Models/users.model');

const protectUsers = asyncHandler(async (req, res, next) => {
  let token;

  //check if the authorization starts with a bearer

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      //verify the token which is a decoded object

      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await UserModel.findById(payload.id);

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized');
    }
  }
});

module.exports = {
  protectUsers,
};

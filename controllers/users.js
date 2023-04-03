const bcrypt = require('bcryptjs');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const { ErrorResponse, SuccessResponse } = require('../utils/responses');
const { comfirmUserPassword, generateUserToken } = require('../utils/users');

module.exports.getUser = asyncHandler(async (_, args, context) => {
  const user = await User.findById(context.user.id);
  return user;
});

module.exports.login = asyncHandler(async (_, args) => {
  const user = await User.findOne({
    email: args.email,
  }).select('+password');

  if (!user) {
    return new ErrorResponse(400, 'Invalid credentials');
  }

  const isPasswordCorrect = await comfirmUserPassword(
    user.password,
    args.password
  );

  if (!isPasswordCorrect) {
    return new ErrorResponse(400, 'Invalid credentials');
  }

  const token = generateUserToken(user);

  return new SuccessResponse(200, true, user, token);
});

const register = async (args) => {
  const input = { ...args };

  try {
    const salt = await bcrypt.genSalt(10);
    input.password = await bcrypt.hash(input.password, salt);

    const user = await User.create(input);
  } catch (error) {
    console.log(error, 'error occured during registration');
  }
};

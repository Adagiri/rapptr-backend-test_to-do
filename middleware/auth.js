const { skip } = require('graphql-resolvers');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { ErrorResponse } = require('../utils/responses');

async function decryptJwtToken(token) {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (payload) {
      return payload;
    } else {
      return {};
    }
  } catch (error) {
    // console.error(error, 'Error occured whilst decrypting jwt Token');
  }
}

async function protect(_, __, context) {
  const user = await User.findById(context.user.id).select('name email');

  if (user) {
    context.user = user;
    context.user.id = user._id;
  } else {
    return new ErrorResponse(401, 'Please log in to continue');
  }
  return skip;
}

module.exports = {
  protect,
  decryptJwtToken,
};

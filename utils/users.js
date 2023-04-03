const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_EXPIRY_TIME = process.env.JWT_EXPIRY_TIME;

module.exports.comfirmUserPassword = async (savedPassword, inputedPassword) => {
  return bcrypt.compare(inputedPassword, savedPassword);
};

module.exports.generateUserToken = (user) => {
  return jwt.sign(
    { id: user._id, email: this.email, name: this.name },
    JWT_SECRET_KEY,
    {
      expiresIn: JWT_EXPIRY_TIME,
    }
  );
};

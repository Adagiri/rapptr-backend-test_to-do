const { decryptJwtToken } = require('../middleware/auth');

const contextHandler = async ({ req }) => {
  let user = {};

  if (
    req.headers.authorization && req.headers.authorization.startsWith('Bearer ')
  ) {
    const token = req.headers.authorization.split(' ')[1];
    user = await decryptJwtToken(token);
  }

  return { user };
};

module.exports = contextHandler;

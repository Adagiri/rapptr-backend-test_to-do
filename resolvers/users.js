const { combineResolvers } = require('graphql-resolvers');
const { register, login, getUser } = require('../controllers/users');
const { protect } = require('../middleware/auth');

module.exports = {
  Query: {
    user: combineResolvers(protect, getUser),
    login: login,
  },

};

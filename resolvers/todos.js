const { combineResolvers } = require('graphql-resolvers');
const {
  getTodos,
  getTodo,
  addTodo,
  editTodo,
  deleteTodo,
} = require('../controllers/todos');
const { protect } = require('../middleware/auth');

module.exports = {
  Query: {
    getTodos: combineResolvers(protect, getTodos),
    getTodo: combineResolvers(protect, getTodo),
  },
  Mutation: {
    addTodo: combineResolvers(protect, addTodo),
    editTodo: combineResolvers(protect, editTodo),
    deleteTodo: combineResolvers(protect, deleteTodo),
  },
};

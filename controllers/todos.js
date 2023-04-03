const asyncHandler = require('../middleware/async');
const Todo = require('../models/Todo');
const { SuccessResponse, ErrorResponse } = require('../utils/responses');

module.exports.getTodos = asyncHandler(async (_, args, context) => {
  const query = { isDeleted: false };
  const todos = await Todo.find(query);
  return todos;
});

module.exports.getTodo = asyncHandler(async (_, args, context) => {
  const todo = await Todo.findById(args.todoId);
  return todo;
});

module.exports.addTodo = asyncHandler(async (_, args, context) => {
  const todo = await Todo.create(args);

  return new SuccessResponse(201, true, todo);
});

module.exports.editTodo = asyncHandler(async (_, args, context) => {
  const todo = await Todo.findByIdAndUpdate(args.todoId, args.updates, {
    new: true,
  });

  return new SuccessResponse(200, true, todo);
});

module.exports.deleteTodo = asyncHandler(async (_, args, context) => {
  const todo = await Todo.findByIdAndUpdate(
    args.todoId,
    { isDeleted: true }, // Soft delete
    { new: true }
  );

  return new SuccessResponse(200, true, todo);
});

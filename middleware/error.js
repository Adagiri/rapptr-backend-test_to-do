const errorHandler = (err) => {
  // Errors can be tweaked to return user friendly messages
  console.log(err, 'err');
  return err;
};

module.exports = errorHandler;

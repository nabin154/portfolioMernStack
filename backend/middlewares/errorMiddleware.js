const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || " backend error !";

  return res.status(statusCode).json({
    message: message,
  });
};

module.exports = errorHandler;

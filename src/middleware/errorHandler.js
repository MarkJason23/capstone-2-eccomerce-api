function errorHandler(err, req, res, next) {
  console.error(err);

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Server error';

  // Malformed ObjectId in the URL
  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
  }

  // Mongoose schema validation failures (e.g. negative price on PATCH)
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ');
  }

  res.status(statusCode).json({
    success: false,
    message
  });
}

module.exports = errorHandler;

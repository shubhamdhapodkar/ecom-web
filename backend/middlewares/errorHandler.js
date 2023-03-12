//not found

const notFound = (req, res, next) => {
  const error = new error(`Not Found : ${req.originalUrl}`);
  res.status(404);
  next(error);
};

//error handler

const errorHandler = (err, req, res, next) => {
  const statuscode = res.statuscode = 200 ? 403 : res.statuscode;
  res.status(statuscode);
  res.json({
    message: err?.message,
    stack: err?.stack,
  });
};

module.exports = { errorHandler, notFound };

export function notFoundHandler(req, res, next){
    const err = new Error(req.originalUrl)
    err.status = 404
    next(err)
}

export function finalErrorHandler(err, req, res, next) {
  const status = err.status || 500
  console.error(err)

  const message = status === 500
    ? 'Internal Server Error (Check Server Logs)'
    : err.message

  res.status(status).json({
    error: true,
    status,
    message
  })
}

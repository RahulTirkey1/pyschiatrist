exports.errorHandler=(message,status,code)=>{
  const err = new Error(message)
  err.statusCode = code || 500
  err.status = status || 'error'
  return err
}
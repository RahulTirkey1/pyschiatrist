module.exports=(err,req,res,next)=>{
  if(!err.statusCode) err.statusCode = 500
  return res.status(err.statusCode).json({
    status:err.status,
    message:err.message,
    stack:err.stack
  })
}
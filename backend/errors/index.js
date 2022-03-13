const badRequest=require('./badRequest')
const notfound=require('./notfound')
const unauthenticated=require('./unauthenticated')
const UnauthorizedError=require('./unauthorised')

module.exports={UnauthorizedError,notfound,badRequest,unauthenticated}
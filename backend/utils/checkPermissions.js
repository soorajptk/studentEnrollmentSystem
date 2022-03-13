const {StatusCodes}=require('http-status-codes')
const customError=require('../errors')

const checkPermmissionsForStudent=(check)=>{
const {user,id}=check
    if(user.role==='admin')return
    if(user.role==='employee')return
    if(user.userId===id)return
    throw new customError.UnauthorizedError('your not  authorized to access this route')
}

const checkPermmissionsForEmployee=(check)=>{
const {user,id}=check
    if(user.role==='admin')return
    if(user.userId===id)return
    throw new customError.UnauthorizedError('your not  authorized to access this route')
}


module.exports={checkPermmissionsForStudent,checkPermmissionsForEmployee}
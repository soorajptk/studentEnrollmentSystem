const AdminModel=require('../models/admin')
const {StatusCodes}=require('http-status-codes')
const customError=require('../errors')
const studentToken=require('../models/studentToken')
const adminToken=require('../models/adminToken')
const employeeToken=require('../models/employeeToken')


const logout=async(req,res)=>{
    const {userId,role}=req.user
    let Token
    if(role==='admin'){
      Token=adminToken
    }
    
    if(role==='student'){
        Token=studentToken
    }
     
    if(role==='employee'){
        Token=employeeToken
    }
    await Token.findOneAndDelete({_id:userId})

    res.cookie('accessToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie('refreshToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });

}


module.exports=logout
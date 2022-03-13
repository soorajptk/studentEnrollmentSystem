const StudentModel=require('../models/student')
const EmployeeModel=require('../models/employee')
const AdminModel=require('../models/admin')
const {StatusCodes}=require('http-status-codes')
const customError=require('../errors')
const crypto=require('crypto')
const studentToken=require('../models/studentToken')
const employeeToken=require('../models/employeeToken')
const {CreateTokenUser,attachCookiesToResponse}=require('../utils')
const adminToken = require('../models/adminToken')



const login=async(req,res)=>{
    const {email,password,role}=req.body
    if(!email || !password){
        throw new customError.badRequest('please provide your credentials')
    }
    let position
    if(role==='admin'){
        position=AdminModel
    }
    if(role==='employee'){
        position=EmployeeModel
    }
    if(role==='student'){
        position=StudentModel
    } 
    const user=await position.findOne({email})

    if(!user){
        throw new customError.unauthenticated('invalid credentials')
    }
    const isMatch= await user.comparePassword(password)
    if(!isMatch){
        throw new customError.unauthenticated('invalid credentials')
    }
    if(role!=='admin'){
        if(!user.isVerified){
        throw new customError.unauthenticated('Please verify your email')
    }
    if(!user.Approval){
        throw new customError.unauthenticated('registration is under process once it\'s done we will send a Email of approval')
    }
    }
    if(role==='student'){
        if(!user.payment){
        throw new customError.unauthenticated('Please make your payment for course')
        }
    }
    

const tokenUser = CreateTokenUser(user);

  let refreshToken = '';

  let Token
     if(role==='admin'){
        Token=adminToken
    }
    if(role==='employee'){
        Token=employeeToken
    }
    if(role==='student'){
        Token=studentToken
    }   
   const existingToken=await Token.findOne({ user: user._id })
  if (existingToken) {
    const { isValid } = existingToken;
    if (!isValid) {
      throw new customError.unauthenticated('Invalid Credentials');
    }
    refreshToken = existingToken.refreshToken;
    attachCookiesToResponse({ res, user: tokenUser, refreshToken });
    res.status(StatusCodes.OK).json({ user});
    return;
  }

  refreshToken = crypto.randomBytes(40).toString('hex');
  const userAgent = req.headers['user-agent'];
  const ip = req.ip;
  const userToken = { refreshToken,ip, userAgent, user: user._id };

  await Token.create(userToken);

  attachCookiesToResponse({ res, user: tokenUser, refreshToken });

  res.status(StatusCodes.OK).json({user});

    }
module.exports={login}    

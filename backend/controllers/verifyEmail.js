const customError=require('../errors')
const {StatusCodes}=require('http-status-codes')
const StudentModel=require('../models/student')
const employeeModel=require('../models/employee')

const verifyEmail=async(req,res)=>{
    const {verificationToken,email,role}=req.body    
    let model;
    if(role==='employee'){
        model=employeeModel
    }
    if(role==='student'){
        model=StudentModel
    }
    const user=await model.findOne({email})
    console.log(user)
    if(!user){
        throw new customError.unauthenticated('Verification failed')
    }
    if(user.verificationToken !== verificationToken){
        throw new customError.unauthenticated('Verification failed')
    }
    user.isVerified = true
    user.verified = Date.now()
    user.verificationToken = '';
    await user.save()
    res.status(StatusCodes.OK).json({msg:'successfully verified!!..'})
}
module.exports=verifyEmail
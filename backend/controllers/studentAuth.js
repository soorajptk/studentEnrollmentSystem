const StudentModel=require('../models/student')
const {StatusCodes}=require('http-status-codes')
const customError=require('../errors')
const crypto=require('crypto')
const {sendVerificationEmail}=require('../utils')

const StudentCreate=async(req,res)=>{
    const {name,email,phone,Address,HighestQualification,passOutYear,password,skillset,emplyomentStatus,TechnologyTraining,course,photo,courseFee,role}=req.body
    const verificationToken= crypto.randomBytes(40).toString('hex')
    const response=await StudentModel.create({name,email,phone,Address,HighestQualification,passOutYear,password,skillset,emplyomentStatus,TechnologyTraining,course,photo,courseFee,role,verificationToken})
    const origin = 'http://localhost:3000';
    await sendVerificationEmail({email:response.email,origin,name:response.name,verificationToken,role:response.role})
    res.status(200).json({msg:'Success! Please check your email to verify account'})

}
    
module.exports={StudentCreate}    
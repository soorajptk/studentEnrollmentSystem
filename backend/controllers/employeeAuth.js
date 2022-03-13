const EmployeeModel=require('../models/employee')
const {StatusCodes}=require('http-status-codes')
const crypto=require('crypto')
const {sendVerificationEmail}=require('../utils')

const employerCreate=async(req,res)=>{
    const verificationToken= crypto.randomBytes(40).toString('hex')
    const response=await EmployeeModel.create({...req.body,verificationToken})
    const origin = 'http://localhost:3000';
    await sendVerificationEmail({email:response.email,origin,name:response.name,verificationToken,role:response.role})
    res.status(StatusCodes.CREATED).json({msg:'Success! Please check your email to verify account'})

}

    
module.exports={employerCreate}    
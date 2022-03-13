const AdminModel=require('../models/admin')
const {StatusCodes}=require('http-status-codes')

const adminCreate=async(req,res)=>{
    const response=await AdminModel.create(req.body)
    res.status(StatusCodes.CREATED).json({msg:'Success!'})

}

    
module.exports={adminCreate}    
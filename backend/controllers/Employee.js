const {StatusCodes}=require('http-status-codes')
const customError=require('../errors')
const employeeModel=require('../models/employee')
const {checkPermmissionsForEmployee, sendApprovalEmailEmployee}=require('../utils')


    const AllEmployee=async(req,res)=>{
    const employee=await employeeModel.find().select('-password')
    res.status(StatusCodes.OK).json({employee,count:employee.length}) 
    }
    
    const SingleEmployee=async(req,res)=>{
    const {id}=req.params
    const employee=await employeeModel.findOne({_id:id}).select('-password')
    res.status(StatusCodes.OK).json(employee) 
    }   
    const UpdateEmployee=async(req,res)=>{
    const {id}=req.params 
    checkPermmissionsForEmployee({user:req.user,id})   
    const employee=await employeeModel.findOneAndUpdate({_id:id},req.body,{new:true,runValidators:true})
    res.status(StatusCodes.OK).json({msg:'successfully updated !...'}) 
    }
    const ApprovalOfEmployee=async(req,res)=>{
     const {id}=req.params 
    const employee=await employeeModel.findOneAndUpdate({_id:id},{Approval:true},{new:true,runValidators:true})
     if(!employee){
      throw new customError.notfound(`No employer exist with ${id}`)  
     }
    await sendApprovalEmailEmployee({email:employee.email,name:employee.name,employeeId:employee._id,role:employee.roles})
    res.status(StatusCodes.OK).json({msg:'Successfully Approved !...'}) 
    }

    const DeleteEmployee=async(req,res)=>{
    const {id}=req.params    
    const employee=await employeeModel.findOne({_id:id})
    if(!employee){
        throw new customError.badRequest('no employee exist with this id')
    }

    await employee.remove()
    res.status(StatusCodes.OK).json({msg:'successfully removed !...'}) 
    }

    const FilterEmployee=async(req,res)=>{
    const employee=await employeeModel.find(req.body)
    if(!employee){
        throw new customError.badRequest('no employee exist with this id')
    }
    res.status(StatusCodes.OK).json({employee}) 
    }

    const searchEmployee=async(req,res)=>{
        const {search}=req.body 
        if(!search){
        const employee=await employeeModel.find().select('-password') 
        res.status(StatusCodes.OK).json({employee , count:employee.length})
        return
        } 
    const employee=await employeeModel.aggregate([{
    $search: {
        index: 'employee',
        regex: {
         query: `${search}.*`,
        path:{'wildcard': '*'} ,
        allowAnalyzedField:true
        }
    }
    }])

res.status(StatusCodes.OK).json({employee , count:employee.length})

    }

module.exports={searchEmployee,AllEmployee,SingleEmployee,UpdateEmployee,DeleteEmployee,ApprovalOfEmployee,FilterEmployee}
const {StatusCodes}=require('http-status-codes')
const customError=require('../errors')
const studentModel=require('../models/student')
const {checkPermmissionsForStudent,sendApprovalEmailStudent}=require('../utils')

const AllStudent=async(req,res)=>{
    const student=await studentModel.find().select('-password')
    res.status(StatusCodes.OK).json({student , count:student.length})
}
const singleStudent=async(req,res)=>{
    const {id}=req.params
    // checkPermmissionsForStudent({user:req.user,id})
    const student=await studentModel.findOne({_id:id}).select('-password')
    res.status(StatusCodes.OK).json(student)
}

const updateStudent=async(req,res)=>{
    const {id}=req.params
    checkPermmissionsForStudent({user:req.user,id})
    const student=await studentModel.findOneAndUpdate({_id:id},req.body,{new:true,runValidators:true})
    res.status(StatusCodes.OK).json({msg:"Updated Successfully !.."})
}
const deleteStudent=async(req,res)=>{
    const {id}=req.params
    checkPermmissionsForStudent({user:req.user,id})
    const student=await studentModel.findOne({_id:id})
    if(!student){
      throw new customError.badRequest('no student exist with this id')
    }
   await student.remove()
    res.status(StatusCodes.OK).json({msg:"Successfully Deleted!.."})
}
const filterStudent=async(req,res)=>{
    
  const student=await studentModel.find(req.body).select('-password')  
  
  res.status(StatusCodes.OK).json({student , count:student.length})

}
const ApprovalOfStudent=async(req,res)=>{
     const {id}=req.params 
    const student=await studentModel.findOneAndUpdate({_id:id},{Approval:true},{new:true,runValidators:true})
     if(!student){
      throw new customError.notfound(`No employer exist with ${id}`)  
     }
    const origin = 'http://localhost:3000';
    await sendApprovalEmailStudent({email:student.email,origin,name:student.name,studentId:student._id,course:student.course})
    res.status(StatusCodes.OK).json({msg:'Successfully Approved !...'}) 
    }


const searchStudent=async(req,res)=>{
const {search}=req.body 
if(!search){
 const student=await studentModel.find().select('-password') 
res.status(StatusCodes.OK).json({student , count:student.length})
return
} 
const student=await studentModel.aggregate([{
  $search: {
    index: 'search',
    regex: {
      query: `${search}.*`,
      path:{'wildcard': '*'} ,
      allowAnalyzedField:true
    }
  }
}])

res.status(StatusCodes.OK).json({student , count:student.length})
}
 
module.exports={searchStudent,ApprovalOfStudent,singleStudent,AllStudent,updateStudent,deleteStudent,filterStudent}
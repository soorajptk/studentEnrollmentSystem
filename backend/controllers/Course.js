const {StatusCodes}=require('http-status-codes')
const customError=require('../errors')
const courseModel=require('../models/course')

const CourseCreate=async(req,res)=>{
   const course=await courseModel.create(req.body)
    res.status(StatusCodes.CREATED).json({msg:"Course added  Successfully !... "})
}
const AllCourse=async(req,res)=>{
const course=await courseModel.find({})
res.status(StatusCodes.OK).json({course})

}
const SingleCourse=async(req,res)=>{
    const {id}=req.params
    const course=await courseModel.findOne({_id:id})
    res.status(StatusCodes.OK).json({course})
}
const UpdateCourse=async(req,res)=>{
    const {id}=req.params
    const {name,desc,photo,courseFee}=req.body
    const course=await courseModel.findOneAndUpdate({_id:id},{name,desc,photo,courseFee},{new:true,runValidators:true})
    res.status(StatusCodes.OK).json({msg:"Course details updated"})

}
const deleteCourse=async(req,res)=>{
   const {id}=req.params
    const course=await courseModel.findOne({_id:id})
   await course.remove()
    res.status(StatusCodes.OK).json({msg:'Course Removed'})
}


module.exports={CourseCreate,AllCourse,SingleCourse,UpdateCourse,deleteCourse}
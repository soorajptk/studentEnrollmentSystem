const {StatusCodes}=require('http-status-codes')
const adminModel=require('../models/admin')
const  employeeModel=require('../models/employee')
const studentModel=require('../models/student')
const showCurrentUser = async (req, res) => {
  const {role,userId}=req.user
  let Model;
  if(role==='admin'){
    Model=adminModel
  }
  if(role==='employee'){
    Model=employeeModel
  }
  if(role==='student'){
    Model=studentModel

  }
  const user= await Model.findOne({_id:userId}).select('-password')
  res.status(StatusCodes.OK).json({ user});
};

module.exports=showCurrentUser
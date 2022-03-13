const express=require('express')
const router=express.Router()
const {StudentCreate}=require('../controllers/studentAuth')
const {employerCreate}=require('../controllers/employeeAuth')
const verifyEmail=require('../controllers/verifyEmail')
const {adminCreate}= require('../controllers/admin')

router.route('/adminCreate').post(adminCreate)
router.route('/student_register').post(StudentCreate)
router.route('/employer_register').post(employerCreate)
router.post('/verify-email', verifyEmail);

module.exports=router
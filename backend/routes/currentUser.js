const express=require('express')
const router=express.Router()
const {authenticateUser}=require('../middlewares/authentication')
const currentUser =require('../controllers/currentUser')

router.route('/showme').get(authenticateUser,currentUser)
module.exports=router

    
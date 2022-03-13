const express=require('express')
const router=express.Router()
const {login}=require('../controllers/Login')
const logout=require('../controllers/Logout')
const {authenticateUser}=require('../middlewares/authentication')

router.route('/login').post(login)
router.route('/logout').post(authenticateUser,logout)



module.exports=router
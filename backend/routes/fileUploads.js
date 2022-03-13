const express=require('express')
const router=express.Router()
const fileupload=require('../controllers/ImageUpload')
router.route('/').post(fileupload)

module.exports=router
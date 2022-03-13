const {StatusCodes}=require('http-status-codes')
const customError=require('../errors')
const Cloudinary=require('cloudinary').v2
const fs=require('fs'
)
const fileUpload=async(req,res)=>{
    if(!req.files){
    throw new customError.badRequest('please provide a file')
    }
    let {image}=req.files
    if(!image || !image.mimetype.startsWith('image')){
        fs.unlinkSync(req.files.image.tempFilePath)
        throw new customError.badRequest('please provide a image')
    }
    let maxSize=1024*1024
    if(image.size > maxSize){
        fs.unlinkSync(req.files.image.tempFilePath)
        throw new customError.badRequest('image size too large make it 1 mb below')
    }
    const response=await Cloudinary.uploader.upload(image.tempFilePath,{
        use_filename:true,
        folder:'Ictak',
    })
    fs.unlinkSync(req.files.image.tempFilePath)
    res.status(StatusCodes.OK).json({image:response.secure_url})
}

module.exports=fileUpload
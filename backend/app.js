require('dotenv').config()
require('express-async-errors')
const express =require('express')
const app=express()
//cookieparser
const cookieParser=require('cookie-parser')
//connectDB
const connectDB=require('./connectDB/connectDB')
//File uploads
const fileUpload=require('express-fileupload')
//notfound
const notFound=require('./middlewares/notFound')
//error-handler
const errorHandler=require('./middlewares/error-handler')
//studentAUTH
const registerAuth=require('./routes/Register')
//login auth
const loginAuth=require('./routes/loginAuth') 
//current user 
const showme=require('./routes/currentUser') 
//course
const Course=require('./routes/course') 
//student
const Student=require('./routes/student')
//fileUploads
const fileUploads=require('./routes/fileUploads')
//employee
const Employee=require('./routes/employee')
//Cloudinary
const  Cloudinary=require('cloudinary').v2
//razorpay
const Razorpay=require('razorpay')
//shortid
const shortid=require('shortid')
//crypto
const crypto=require('crypto')
//studentModel
const studentModel=require('./models/student')

const razorpay=new Razorpay({
    key_id:'rzp_test_5xX1QVWb8qAfgL',
    key_secret:'1mkmYeRbvXq1vkclyH5yEWmJ'
})
Cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

const cors=require('cors')
app.use(fileUpload({useTempFiles:true}))
app.use(cookieParser(process.env.JWT_SECRET));

app.get('/',(req,res)=>{
    res.status(200).send("home")
})
app.use(cors({origin:"http://localhost:3000", credentials:true}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.post('/verification',async(req,res)=>{
    let SECRET='Ictak@123'
    const shasum=crypto.createHmac('sha256',SECRET)
    shasum.update(JSON.stringify(req.body))
    const digest=shasum.digest('hex')
    console.log(digest,req.headers['x-razorpay-signature'])
    console.log(req.body)
    if(digest === req.headers['x-razorpay-signature']){
        console.log('success')
       const res= await studentModel.findOneAndUpdate({email:req.body.payload.payment.entity.email},{payment:true},{new:true,runValidators:true}).then(data=>data).catch(err=>console.log(err))
    }else{
        console.log('failed')

    }
    res.json({status:'ok'})
})

app.post('/razorpays',async(req,res)=>{
    const {id}=req.body
    const student=await studentModel.findOne({_id:id})
		console.log(student,"ppppp")

    const payment_capture=1
    let amount=student.courseFee
    let currency='INR'
    let options={
        amount:(amount*100).toString()
        ,currency,
        receipt:`${shortid.generate()}`
        ,payment_capture
    }
    const response=await razorpay.orders.create(options)
    
    res.status(200).json({id:response.id,currency:response.currency,amount:response.amount,email:student.email,name:student.name,phone:student.phone})
})


app.use('/api/auth',registerAuth)
app.use('/api/auth',loginAuth)
app.use('/api/auth',showme)
app.use('/api/course',Course)
app.use('/api/student',Student)
app.use('/api/employee',Employee)
app.use('/api/fileupload',fileUploads)
app.use(notFound)
app.use(errorHandler)

let PORT=process.env.PORT || 5000
const start=async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT,()=>console.log("server running"))
    } catch (error) {
    console.log(error)        
    }
}

start()
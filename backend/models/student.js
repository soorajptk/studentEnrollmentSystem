const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const StudentSchema=new mongoose.Schema({
    name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide valid email',
    },
  },
  phone:{
    type:String,
    unique:true,
    required:[true,'please provide mobile number'],
    validate:{
      validator:validator.isMobilePhone,
      message:'please provide a valid mobile number'
    }
  },
  Address:{
    type:String,
    required:[true,'address field is mandatory'],
    trim:true,
  },
  HighestQualification:{
    type:String,
    required:[true,'please provide your Highest Qualification']
  },
  passOutYear:{
    type:String,
    required:[true,'please provide your pass out year']
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  },
  skillset:{
       type:String,
    required:[true,'please provide your skillset']
  },
  emplyomentStatus:{
    type:String,
    required:[true,'plaese provide employment status'],
    enum:{
      values:['employee','student','selfemployeed']
      ,message:`emplyomentStatus choosen value  is not supported`
    }
  },
  TechnologyTraining:{
    type:String,
    required:[true,'plaese provide Technology Training ']
  },

  course:{
   type:String,
    required:[true,'plaese choose your course']

  },
  photo:{
    type:String,
    required:[true,'plaese provide your image']
    
  },
  courseFee:{
    type:String,
    required:true

  },
  role: {
    type: String,
    default: 'student',
  },
  verificationToken: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  verified: Date,
  passwordToken: {
    type: String,
  },
  passwordTokenExpirationDate: {
    type: Date,
  },
  payment:{
    type:Boolean,
    default:false
  },
  Approval:{
    type:Boolean,
    default:false
  },
  exitExamMark:{
    type:String,
  }
},{timestamps:true})


StudentSchema.pre('save',async function(){
if(!this.isModified('password')) return
  let salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
})

StudentSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword,this.password)
  return isMatch;
};

try {
  StudentSchema.index({ "$**": "text" });
  
} catch (error) {
console.log(error)  
}





module.exports=mongoose.model('Student',StudentSchema)
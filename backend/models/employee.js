const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')

const employeeSchema=new mongoose.Schema({

    name:{
        type:String,
        required:[true,'name filed is mandatory']
    },
    email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please provide valid email',
    },
  },
    password:{
        type:String,
        required:[true,'password filed is mandatory']
    },
    role:{
        type:String,
        default:'employee'
      },
    photo:{
        type:String,
        required:true
    },
    roles:{
      type:String,
      required:true
    },
    Approval:{
      type:Boolean,
      default:false
    }
    ,
    verificationToken: String,
    isVerified: {
    type: Boolean,
    default: false,
  },
  verified: Date,
  about:{
    type:String
  },
  
  passwordToken: {
    type: String,
  },
  passwordTokenExpirationDate: {
    type: Date,
  }

})


employeeSchema.pre('save',async function(){
if(!this.isModified('password')) return
  let salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
})

employeeSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword,this.password)
  return isMatch;
};




module.exports=mongoose.model('Employee',employeeSchema)
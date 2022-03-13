const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const AdminModel=new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Admin field is Mandatory"],
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:validator.isEmail,
            message:'please provide a valid mail'
        }
    },
    password:{
        type:String,
        required:[true,'password filed is mandatory'],
    },
     role:{
        type:String,
        default:'admin'
    }
})



AdminModel.pre('save',async function(){
if(!this.isModified('password')) return
  let salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
})

AdminModel.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword,this.password)
  return isMatch;
};




module.exports=mongoose.model('Admin',AdminModel)
const mongoose=require('mongoose')
const Course=new mongoose.Schema({

    name:{
        type:String,
        required:[true,'please provide name of the Course'],
        unique:true
    },
    desc:{
        type:String,
        required:[true,'please provide something about your Course'],
        minlength:[5,'course description  minum 5 characters '],
    },
    photo:{
         type:String,
         required:[true,'please provide image for your Course']
    },
    courseFee:{
        type:String,
        required:[true,'please provide Course Fee for your Course']
    },
    Eligibility:{
          type:String,
        required:[true,'please provide eligibilty of the Course'],
    }
})

module.exports=mongoose.model('Course',Course)
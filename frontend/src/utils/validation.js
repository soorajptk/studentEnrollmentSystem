
const validate=(data)=>{
const EMAIL_REGEX=/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
  var phoneno = /^\d{10}$/;
 
const {name,email,phone,Address,HighestQualification,passOutYear,skillset,emplyomentStatus,TechnologyTraining}=data
let obj={}
if(!name){
obj.name="please provide your name"
}
if(!Address || !HighestQualification || !passOutYear || !skillset || !emplyomentStatus || !TechnologyTraining){
obj.others="make sure All fileds are Not empty"
}
if(!EMAIL_REGEX.test(email)){
obj.email="invalid email"
}
if(!phoneno.test(phone)){
obj.phone="invalid Mobile num"

}
return obj
}

export default validate
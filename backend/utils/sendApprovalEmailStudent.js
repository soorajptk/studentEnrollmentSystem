const sendMail=require('./sendEmail')

const sendApprovalEmailStudent=async({course,email,name,studentId,origin})=>{
const payment = `${origin}/makepayment?id=${studentId}`;

 let message=`<p>Hello ${name} your ${course} registration is approved from our side and your studentId ${studentId} <br> <strong> please make your payment for your Course :<a href=${payment}>make payment</a></strong> </p>`   

return sendMail({to:email,subject:'ICT academy of kerala Approval of Course enrollment',html:message})
}

module.exports=sendApprovalEmailStudent
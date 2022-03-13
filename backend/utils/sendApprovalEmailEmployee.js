const sendMail=require('./sendEmail')

const ApprovalEmployee=async({name,email,employeeId,role})=>{

let message=`<p><strong>${name}</strong> congratulations you are appointed as a ${role}</p>`

    return sendMail({to:email,subject:"Approval Of Employee",html:message})

}

module.exports=ApprovalEmployee
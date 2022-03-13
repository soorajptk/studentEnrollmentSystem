const CreateTokenUser=require('./createTokenUser')
const {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
}=require('./jwt')
const sendVerificationEmail=require('./sendVerificationEmail')
const {checkPermmissionsForEmployee,checkPermmissionsForStudent}=require('./checkPermissions')
const sendApprovalEmailEmployee=require('./sendApprovalEmailEmployee')
const sendApprovalEmailStudent=require('./sendApprovalEmailStudent')

module.exports={CreateTokenUser,sendApprovalEmailStudent,sendApprovalEmailEmployee,createJWT,isTokenValid,attachCookiesToResponse,sendVerificationEmail,checkPermmissionsForEmployee,checkPermmissionsForStudent}
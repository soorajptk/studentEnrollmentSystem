
import axios from 'axios'
import React, { useEffect } from 'react'
import Header from '../../components/header/Header'
import SingleEmployee from '../../components/SingleEmployee/SingleEmployee'
import { useGlobalContext } from '../../context'

function ApprovalOfEmployee() {
     const {PendingEmployee,setPendingEmployee}=useGlobalContext()
    
    useEffect(()=>{
    const PendingStudents=async()=>{
     let data={isVerified:true,Approval:false}
     try {
    const fetch=await axios.post('/api/employee/filter/employee',data,{withCredentials:true})
    setPendingEmployee(fetch.data.employee)           
     } catch (error) {
     console.log(error)           
     }   
      }
      PendingStudents()
},[])

if(PendingEmployee.length===0){
return <section>
        <Header/>
         <div className='ApprovalTitle'> 
        <h3>pending Aprroval</h3>  
       </div>
        <div className='pendingReq'>
      <h3>no pending request</h3>

        </div>
</section>
}
  return (
 <section>
        <Header/>
       <div className='ApprovalTitle'> 
        <h3>pending Aprroval</h3>  
       </div>
       <div>
           {
               PendingEmployee.map((item,ind)=>{
                return <SingleEmployee key={ind} item={item} btn={'approve'}/>
               })
           }
          
       </div>
    </section>
  )
}

export default ApprovalOfEmployee
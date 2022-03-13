
import React,{useEffect} from 'react'
import Header from '../../components/header/Header'
import './ApprovalOfStudent.css'
import SingleStudent from '../../components/singleStudent/SingleStudent'
import axios from 'axios'
import { useGlobalContext } from '../../context'

function ApprovalofStudent() {
    const {PendingStudent,setPendingStudent}=useGlobalContext()
    
    useEffect(()=>{
    const PendingStudents=async()=>{
     let data={isVerified:true,Approval:false}
     try {
    const fetch=await axios.post('/api/student/filter/data',data,{withCredentials:true})
     setPendingStudent(fetch.data.student)           
     } catch (error) {
     console.log(error)           
     }   
      }
      PendingStudents()
},[])

if(PendingStudent.length===0){
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
               PendingStudent.map((item,ind)=>{
                return <SingleStudent key={ind} item={item} want={'approve'}/>
               })
           }
          
       </div>
    </section>
  )
}

export default ApprovalofStudent
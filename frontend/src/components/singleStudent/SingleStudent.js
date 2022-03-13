import axios from 'axios'
import React from 'react'
import {useNavigate} from 'react-router-dom'
import { useGlobalContext } from '../../context'
import { faCheck, faTrash, faUserEdit} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import './SingleStudent.css'

function SingleStudent({item,want}) {
const navigate= useNavigate()
const {user,loadStudents,setLoadStudents,setSuccess,setError,PendingStudent,setPendingStudent}=useGlobalContext()

const handleView=(id)=>{
navigate(`/studentprofile/${id}`)
}

//removeStudent
const removeStudent=async(id)=>{
console.log(id)
try{
setLoadStudents(loadStudents.filter((item)=>item._id !== id))
const response=await axios.delete(`/api/student/${id}`,{withCredentials:true})
console.log(response?.data)
setSuccess(response?.data?.msg)
}catch(err){
  setError(err.response)
  console.log(err.response)
}
}
//approvalof student
const ApprovalOfStudent=async(id)=>{
try{
setPendingStudent(PendingStudent.filter((item)=>item._id !== id))
const response=await axios.get(`/api/student/approval/${id}`,{withCredentials:true})
console.log(response?.data)
setSuccess(response?.data?.msg)
}catch(err){
  setError(err.response)
  console.log(err.response)
}
}

    return (
    <article className={'SingleStudentContainer' }>
        <div className='imgsection'>
            <img className='singleStudentImg singleStudentImgsmall' src={item?.photo} alt="user" />
        </div>
        <div className='SingleStudentDetails'>
            <h3>{`${item?.name}`}</h3>
            <h4 className='hideCourse'>{`${item?.course}`}</h4>
        </div>
        <div className='singleStudentOptions'>
          {user?.role ==='admin' && <button className='deletebtn editbtnhide' onClick={()=>removeStudent(item._id)}>delete</button>}
            <div className='iconsmobile'>
           {user?.role ==='admin' && <span><FontAwesomeIcon onClick={()=>removeStudent(item._id)}  className='employeeTrash hides' icon={faTrash}/></span>}
            
           {want==='view' && <span><FontAwesomeIcon className='employeeEdit hides ' icon={faUserEdit}/></span>} 
            {want==='approve' && <span><FontAwesomeIcon onClick={()=>ApprovalOfStudent(item._id)}  className='employeeApprove hides' icon={faCheck}/></span>}

            </div>
            
           {want ==='approve' && <button onClick={()=>ApprovalOfStudent(item._id)} className='editbtn editbtnhide'>Approve</button>}
           {want==='view' && <button onClick={()=>handleView(item._id)}  className='editbtn editbtnhide'>View</button>}
        </div>
    </article>
    )
}

export default SingleStudent
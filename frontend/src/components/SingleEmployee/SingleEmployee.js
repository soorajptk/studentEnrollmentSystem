
import { faCheck, faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React from 'react'
import {useNavigate} from 'react-router-dom'
import { useGlobalContext } from '../../context'
import './SingleEmployee.css'


function SingleEmployee({item,btn}) {
const {setError,setSuccess,LoadEmployee,setLoadEmployee,PendingEmployee,setPendingEmployee}=useGlobalContext()
const navigate=useNavigate()

const removeEmployee=async(id)=>{
console.log(id)
try{
btn==='view' ? setLoadEmployee(LoadEmployee.filter((item)=>item._id !== id)) : setPendingEmployee(PendingEmployee.filter((item)=>item._id !== id))
const response=await axios.delete(`/api/employee/${id}`,{withCredentials:true})
console.log(response?.data)
setSuccess(response?.data?.msg)
}catch(err){
  setError(err.response.data.msg)
  console.log(err.response)
}
}

const ApprovalOfEmployee=async(id)=>{
try{
setPendingEmployee(PendingEmployee.filter((item)=>item._id !== id))
const response=await axios.get(`/api/employee/approvalofemployee/${id}`,{withCredentials:true})
console.log(response?.data)
setSuccess(response?.data?.msg)
}catch(err){
  setError(err.response)
  console.log(err.response)
}
}
const reallocate=(id)=>{
navigate(`/employeeprofile/${id}`)
}

  return (
    <article className={'SingleEmployeeContainer' }>
        <div className='imgsection'>
            <img className='SingleEmployeeImg' src={item?.photo} alt="user" />
        </div>
        <div className='SingleEmployeeDetails'>
            <h3>{`${item?.name}`}</h3>
            <h4 className='hideCourse'>{`${item?.roles}`}</h4>
        </div>
        <div className='SingleEmployeeOptions'>
            <button onClick={()=>removeEmployee(item._id)} className='deletebtn editbtnhide' >delete</button>
             <div className='iconsmobile'>
            <span><FontAwesomeIcon onClick={()=>removeEmployee(item._id)}  className='employeeTrash hides' icon={faTrash}/></span>
            
           {btn==='view' && <span><FontAwesomeIcon onClick={()=>reallocate(item?._id)} className='employeeEdit hides ' icon={faUserEdit}/></span>} 
            {btn==='approve' && <span><FontAwesomeIcon onClick={()=>ApprovalOfEmployee(item._id)}  className='employeeApprove hides' icon={faCheck}/></span>}

            </div>
           {btn ==='approve' && <button  onClick={()=>ApprovalOfEmployee(item._id)} className='editbtn editbtnhide'>Approve</button>}
           {btn ==='view' && <button onClick={()=>reallocate(item?._id)}  className='editbtn editbtnhide'>View</button>}
        </div>
    </article>


  )
}

export default SingleEmployee
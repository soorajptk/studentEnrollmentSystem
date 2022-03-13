
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context'
import './Search.css'
function Search({Search}) {
const [SearchInp,setSearchInp]=useState('')
const {setLoadStudents,setSearchStudent,setLoadEmployee}=useGlobalContext()
//searchStudents
useEffect(()=>{
const searchStudents=async()=>{
if(Search[0]==='students'){
  try {
  const filterdData=await axios.post(`/api/student/searchStudent`,{search:SearchInp},{withCredentials:true})
if(Search[1]==='studentpage'){
  const filter=filterdData.data.student.filter((item)=>item.Approval===true && item.payment===true && item.isVerified===true)
setLoadStudents(filter)
console.log(filter)
}
if(Search[1]==='SearchPage'){
  const filter=filterdData.data.student.filter((item)=>item.Approval===true && item.payment===true && item.isVerified===true)

  setSearchStudent(filter)
}  
} catch (error) {
console.log(error) 
}
}
if(Search[0]==='employee'){
  const filterdData=await axios.post(`/api/employee/searchemployee`,{search:SearchInp},{withCredentials:true})
const filter=filterdData.data.employee.filter((item)=>item.Approval===true && item.isVerified===true)
setLoadEmployee(filter)
console.log(filter)
}
  
}
searchStudents()   
},[SearchInp])



return (
    <section className='Search'>
        <div className='SearchContainer'>
        <label className='labelSearch' htmlFor="Search">Search</label>
        <input onChange={(e)=>setSearchInp(e.target.value)} placeholder='Type here...' type="text" name="search" className='SearchInp' id="Search" />
        </div>
        
    </section>
  )
}

export default Search
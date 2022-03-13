
import React, { useEffect } from 'react'
import Header from '../../components/header/Header'
import SingleEmployee from '../../components/SingleEmployee/SingleEmployee'
import Search from '../../components/search/Search'
import axios from 'axios'
import { useGlobalContext } from '../../context'

function Employee() {
  const {LoadEmployee,setLoadEmployee}=useGlobalContext()
  
 useEffect(()=>{
   const loadEmployee=async()=>{
    try {
      const employees=await axios.get('/api/employee/allemployee',{withCredentials:true})
      console.log(employees)
     const data= employees.data.employee.filter((item)=>item.Approval!==false && item.isVerified!==false)
      setLoadEmployee(data)
    } catch (error) {
      console.log(error.response)
      
    }
   }
   loadEmployee()
 },[])
    return (
    <section>
        <Header/>
        <Search Search={['employee']}/>
    <div>
      {
        LoadEmployee.map((item,ind)=>{
          console.log(item)
       return <SingleEmployee key={ind} item={item} btn={'view'} />
        })
      }
    </div>
    </section>
  )
}

export default Employee
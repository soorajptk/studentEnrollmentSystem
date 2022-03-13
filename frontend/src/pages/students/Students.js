
import React, { useEffect} from 'react'
import { useGlobalContext } from '../../context'
import './Students.css'
import Header from '../../components/header/Header'
import SingleStudent from '../../components/singleStudent/SingleStudent'
import Search from '../../components/search/Search'
import axios from 'axios'
function Students() {
const {loadStudents,setLoadStudents}=useGlobalContext()

//loadstudentData  
useEffect(()=>{
    const fetchStudents=async()=>{
      try {
        let data={Approval:true,payment:true,isVerified:true}
        const response=await axios.post('/api/student/filter/data',data,{withCredentials:true})
        setLoadStudents(response.data.student)
        localStorage.setItem('Students',JSON.stringify(response.data.student))
      } catch (error) {
      }
    }
    fetchStudents()
  },[])

  return (<section className='ViewContainer'>
    <Header/>
    <div className="StudentTitle">
      <h2>Students</h2>
    </div>
  <Search Search={['students','studentpage']} />
  <div>
    {
      loadStudents.map((item,ind)=>{
        return <SingleStudent key={ind} want={'view'} item={item}  />
      })
    }
  </div>
  
  </section>
    )
}

export default Students
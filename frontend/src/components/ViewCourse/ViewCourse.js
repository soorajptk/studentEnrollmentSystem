
import React from 'react'
import './ViewCourse.css'
import Course from '../Course/Course'
import {useGlobalContext} from '../../context'

function ViewCourse() {
  const {course}=useGlobalContext()
  return (
  
    <section >
        <div className='courseContainer' >
        {
          course.map((item)=>{
            return <Course key={item._id} {...item}/>
          })
        }
        
        
        </div>
        
    </section>
    )
}

export default ViewCourse

import React from 'react'
import './CourseView.css'
import { Link } from 'react-router-dom'
import Header from '../../components/header/Header'
import ViewCourse from '../../components/ViewCourse/ViewCourse'
import { useGlobalContext } from '../../context'
function CourseView() {
  const {user}=useGlobalContext()


  return (

    <div>
        <Header/>
        
        <div className='courseHeader'>
          <h3 className='CourseNAME'>Courses</h3>
          <p className='courseDuration' >LONG TERM TRAINING ( 6 MONTHS )</p>
          <h5 className='courseAbout'>We conduct various programs which leverages the link between industry and academia. The curriculum for individual course has been designed by a perfect blend of inputs from renowned academicians and industry experts from across the Globe.
The curriculum is more responsible to industry needs and provide the students with skills for employment and positive work values needed to meet the demands of the changing industry scenario and global environment.
</h5>
          {user?.role==='admin' && <Link className='AddCourse' to={'/addCourse'} >Add Course</Link>}
           
        </div>
        
        <ViewCourse/>
    </div>
  )
}

export default CourseView
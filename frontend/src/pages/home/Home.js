
import React from 'react'
import './Home.css'
import ViewCourse from '../../components/ViewCourse/ViewCourse'
import Header from '../../components/header/Header'
function Home() {

  return (<>
        <Header/>
         <div className='ApprovalTitle'> 
        <h3>Courses</h3>
        <div className='underline'></div>  
       </div>
         <ViewCourse/>
    </>
  )
}
export default Home
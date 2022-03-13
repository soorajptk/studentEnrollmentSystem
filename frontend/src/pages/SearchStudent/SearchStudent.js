import React, { useEffect, useState } from "react";
import "./SearchStudent.css";
import Header from "../../components/header/Header";
import Search from "../../components/search/Search";
import { useGlobalContext } from "../../context";
import axios from "axios";

function SearchStudent() {
    const {SearchStudent,setSearchStudent}=useGlobalContext()
  const [resize,setResize]=useState(false)
useEffect(()=>{
  const event= window.addEventListener('resize',()=>{
    console.log(window.innerWidth)
    if(window.innerWidth<640){
      setResize(true)
    }else{
      setResize(false)

    }
  })
  return window.removeEventListener('resize',event)
},[])

useEffect(()=>{
const fetchStudents=async()=>{
try {
     let data={Approval:true,payment:true,isVerified:true}
        const response=await axios.post('/api/student/filter/data',data,{withCredentials:true})
    setSearchStudent(response.data.student)
console.log(response)

} catch (error) {
console.log(error)
    
}
}
fetchStudents()

},[])

if(resize){
  return <>
  <section>
      <Header />
      <Search Search={['students','SearchPage']} />
        {
                SearchStudent.map((item,ind)=>{
                    const {name,passOutYear,emplyomentStatus,course,HighestQualification}=item
                    return<article key={ind} className="mobileResize">
            <div className="mobileResizeDiv">
            <p className="paragrapgh">NAME</p>
            <p className="paragrapgh">{name}</p>

          </div>
          <div className="mobileResizeDiv">
            <p className="paragrapgh">QUALIFICATION</p>
            <p className="paragrapgh">{HighestQualification}</p>

          </div>
          <div className="mobileResizeDiv">
            <p className="paragrapgh">DISTRICT</p>
            <p className="paragrapgh">{"district"}</p>

          </div>
          <div className="mobileResizeDiv">
            <p className="paragrapgh">STATE</p>
            <p className="paragrapgh">NAME</p>

          </div>
          <div className="mobileResizeDiv">
            <p className="paragrapgh">PASSOUT YEAR </p>
            <p className="paragrapgh">{passOutYear}</p>

          </div>
          <div className="mobileResizeDiv">
            <p className="paragrapgh">EMPLOYMENT STATUS</p>
            <p className="paragrapgh">{emplyomentStatus}</p>

          </div>
          <div className="mobileResizeDiv">
            <p className="paragrapgh">COURSE NAME</p>
            <p className="paragrapgh">{course}</p>
          </div>
          <div className="mobileResizeDiv">
            <p className="paragrapgh">EXIT EXAM MARK</p>
            <p className="paragrapgh">NAME</p>
          </div>
        </article>
                })
              }
  </section>
  </>

}

  return (
    <section>
      <Header />
      <Search Search={['students','SearchPage']} />
      <div className="SearchStudentContainer">
        <article className="StudentDetails">
          <div className="studentName">
            <p>NAME</p>
          </div>
          <div className="QUALIFICATION">
            <p>QUALIFICATION</p>
          </div>
          <div className="DISTRICT">
            <p>DISTRICT</p>
          </div>
          <div className="STATE">
            <p>STATE</p>
          </div>
          <div className="PASSOUTYEAR">
            <p>PASSOUT YEAR </p>
          </div>
          <div className="EMPLOYMENTSTATUS">
            <p>EMPLOYMENT STATUS</p>
          </div>
          <div className="COURSENAME">
            <p>COURSE NAME</p>
          </div>
          <div className="EXITEXAMMARK">
            <p>EXIT EXAM MARK</p>
          </div>
        </article>
            {
                SearchStudent.map((item,ind)=>{
                    const {name,passOutYear,emplyomentStatus,course,HighestQualification}=item
                    return <article key={ind} className="StudentDetail">
          <div className="studentName">
            <p>{name}</p>
          </div>
          <div className="QUALIFICATION">
            <p>{HighestQualification}</p>
          </div>
          <div className="DISTRICT">
            <p>district</p>
          </div>
          <div className="STATE">
            <p>satte</p>
          </div>
          <div className="PASSOUTYEAR">
            <p>{passOutYear}</p>
          </div>
          <div className="EMPLOYMENTSTATUS">
            <p>{emplyomentStatus}</p>
          </div>
          <div className="COURSENAME">
            <p>{course}</p>
          </div>
          <div className="EXITEXAMMARK">
            <p>0</p>
          </div>
        </article>

                })
            }


      </div>
    </section>
  );
}

export default SearchStudent;

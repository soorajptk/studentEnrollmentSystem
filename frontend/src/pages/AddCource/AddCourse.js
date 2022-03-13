
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './AddCource.css'
import Header from '../../components/header/Header'
import {faCamera} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import axios from 'axios'
import spinner from '../../images/spinner.gif'

import { useGlobalContext } from '../../context'


function AddCourse() {
    const {setLoading,setReload,setError,setSuccess}=useGlobalContext()
    const navigate=useNavigate()


   const [photo,setPhoto]=useState('https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg')
    const [imgUploadLoading,setImgUploadLoading]=useState(false)
    const [coursename,setCourseName]=useState('')
    const [courseDesc,setCourseDesc]=useState('')
    const [courseFee,setCourseFee]=useState('')
    const [Eligibility,setEligibilty]=useState('')
    
  

const handleUpload=async(e)=>{
     setImgUploadLoading(true)   
    let data=new FormData()
    data.append('image',e.target.files[0])
    try{
        const response=await axios.post('/api/fileupload',data)
        setPhoto(response.data.image)
         setImgUploadLoading(false)   
    }catch(err){
        console.log(err)
         setImgUploadLoading(false)   
    }
    }


    const handleSubmit=async(e)=>{
        e.preventDefault();
        setReload('')
        setLoading(true)
        if(!coursename || !courseDesc || !courseFee || !Eligibility){
            setLoading(false)
            setError('please provide All fields')
          return  
        }
        try {
    let data={name:coursename,desc:courseDesc,courseFee,photo,Eligibility}
        console.log(data)
            const response=await axios.post('/api/course/create',data)
              console.log(response)
                setLoading(false)
                setSuccess('course added')
                setReload('d')
                navigate('/')

            } catch (error) {
                setLoading(false)
            console.log(error.response)
                setError(error.response.data.msg)
            
        }                
    }



  return (
   <main className='register'>
            <Header/>
            <div className='rgsterheading'>
            <h2 className='heading'> Add Course</h2>
            </div>

    <section className='employeeregContainer'>
        <form onSubmit={handleSubmit} >
        {/* photo */}

                <div className='RegisterUserImgContainer'>
                <label className='RegisterUserImgLabel' htmlFor="photo"><FontAwesomeIcon icon={faCamera} /></label>
                <img className='RegisterUserImg' src={photo} alt="userImage"  />
                    <input className='inpts' style={{display:'none'}} onChange={handleUpload} id='photo' name='photo' type="file" />
                    {
                        imgUploadLoading && <img className='imgloading' src={spinner} alt="spinner" />
                    }
                   
                </div>
        {/* coursename */}

            <div className='employeeRegisterfield'>
                <label  htmlFor="coursename">Course Name:</label>                
                <br/>
                    
                <input className='inpts'  type="text" id='coursename' value={coursename}  autoComplete='off' onChange={(e)=>setCourseName(e.target.value)} required  
               
                />
            
            </div >

            {/* description */}

             <div className='employeeRegisterfield'>
                <label htmlFor="courseDesc">Course Description: </label>
                    <br/>
                
                <textarea  className='inpts' value={courseDesc} name="coursedesc" onChange={(e)=>setCourseDesc(e.target.value)} required id="courseDesc" cols="30" rows="6"></textarea>
             </div >
            {/*COURSEFEE  */}
              <div className='employeeRegisterfield'>
                <label htmlFor="courseFee">Course Fee:</label>
                <input className='inpts' type="number" value={courseFee} name="courseFee" id="courseFee" onChange={(e)=>setCourseFee(e.target.value)}  autoComplete='off'  />
                
             </div>
                   
    {/* "eligibilty" */}            
                <div className='employeeRegisterfield'>
                <label htmlFor="eligibility">Eligibility:</label>
                <br/>
                <input className='inpts'
                type="text" id='eligibility' value={Eligibility}  autoComplete='off' onChange={(e)=>setEligibilty(e.target.value)}   
              />
              
            </div >

           

            <button className='employeergstrbtn'  type='submit'>Add Course</button>
            </form>
            </section>
        </main>
    )
}

export default AddCourse
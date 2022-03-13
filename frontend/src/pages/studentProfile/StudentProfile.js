import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import './StudentProfile.css'
import Header from '../../components/header/Header'
import {faCamera, faPhone, faEnvelope, faMapLocationDot, faUserEdit, faTrash} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import axios from 'axios'
import {useGlobalContext} from '../../context' 
import validate from '../../utils/validation'
function StudentProfile() {
    const {user,setLoading,setSuccess,setError}=useGlobalContext()
    const [updateMode,setUpdateMode]=useState(false)
    const {id}=useParams()
    const [loadStudentProfile,setLoadStudentProfile]=useState({})

    const imageUpload=async(e)=>{
        const photo=e.target.files[0]
        const data=new FormData()
        data.append('image',photo)
        console.log(data)
        try {
        const response=await axios.post('/api/fileupload',data)
         console.log(response)
         setLoadStudentProfile({...loadStudentProfile,photo:response.data.image})
        } catch (error) {
         console.log(error)
            
        }
    }
const handleSubmit=async(e)=>{
    e.preventDefault()
    setLoading(true)
    const data=validate(loadStudentProfile)
    if(Object.keys(data).length > 0){
        setLoading(false)
        return setError(Object.values(data))
    }
    try {
        const response=await axios.patch(`/api/student/${id}`,loadStudentProfile)
        setLoading(false)
        setSuccess(response.data.msg)
    } catch (error) {
        setLoading(false)
        setError(error.response)
    }
}

    const handleChange=(e)=>{
        const {name,value}=e.target
        setLoadStudentProfile({...loadStudentProfile,[name]:value})
    }

 
    useEffect(()=>{
    const loadStudentProfile=async()=>{
    try {
    const response=await axios.get(`/api/student/${id}`,{withCredentials:true})
setLoadStudentProfile(response.data)   
} catch (error) {
console.log(error)   
}        
}
loadStudentProfile()
},[])


  return (
    <>
    <Header/>
    <section className='studentProfile'>
        <form onSubmit={handleSubmit}>
        <div className="innerContainerProfile">
        <article className='profile'>
        <div className='container'>
        <div className='profileimagediv'>
            <div className='imgprofiles'> 
        <img className='profileimage' src={loadStudentProfile.photo} alt="studentPic" />
            {updateMode && <label className='uploadimageStudent' htmlFor="imageUpload"><FontAwesomeIcon icon={faCamera}/></label>}
            <input type="file" onChange={imageUpload} style={{display:'none'}}  name="photo" id="imageUpload" />
            </div>
            <div className='namess'>
                {!updateMode && <h2 className='usernameProfile'>{loadStudentProfile.name}</h2>}
            
            {updateMode && <input disabled={user?.role ==='employee'  ? true : false} type="text" value={loadStudentProfile.name} onChange={handleChange} />}
            <div className='editContainer'>
                {!updateMode && <FontAwesomeIcon className='editStudentProfileTrash' icon={faTrash} />} 
               {!updateMode && <FontAwesomeIcon onClick={()=>setUpdateMode(true)} className='editStudentProfileEdit' icon={faUserEdit} />}
            </div>
                
            </div>
        </div>
        <div className='profileAdditional'>
            <span><FontAwesomeIcon className='usericon' icon={faPhone}/>  </span>
            {!updateMode && <h4> {loadStudentProfile.phone}</h4>}
            {updateMode && <input disabled={user?.role ==='employee'  ? true : false} onChange={handleChange} name='phone' value={loadStudentProfile.phone} type="text" />}
          <span><FontAwesomeIcon className='usericon' icon={faEnvelope}/>  </span>
            {!updateMode && <h4>{loadStudentProfile.email}</h4>}
            {updateMode && <input disabled={user?.role ==='employee'  ? true : false}  value={loadStudentProfile.email} name='email' onChange={handleChange} type="text" />}
            <span><FontAwesomeIcon className='usericon' icon={faMapLocationDot}/>  </span>
            {!updateMode && <h4>{loadStudentProfile.Address}</h4>}
            {updateMode && <input disabled={user?.role ==='employee'  ? true : false} value={loadStudentProfile.Address} name='Adrress' onChange={handleChange} type="text" />}
       
        </div>
        </div>
    </article>
    <section className='bodyProfile'>
        <article className='GeneralInformation'>
        <h3>Acadamic Records</h3>
        <div className='records'>
            {
                !updateMode && <table >
                <thead>
                    <tr>
                    <th style={{width:'70%'}}></th>
                    <th></th>
                </tr>

                </thead>
                <tbody>
                 <tr>
                    <td><p className='recordsData'>HighestQualification</p></td>
                    <td><p className='recordsData'>{loadStudentProfile.HighestQualification}</p></td>
                </tr>
                <tr>
                    <td><p className='recordsData'>passOutYear</p></td>
                    <td><p className='recordsData'>:{loadStudentProfile.passOutYear}</p></td>
                </tr>

                <tr>
                    <td><p className='recordsData'>skills </p></td>
                    <td><p className='recordsData'>:{loadStudentProfile.skillset}</p></td>
                </tr>
                {/* <tr>
                    <td><p className='recordsData'>emplyomentStatus </p></td>
                    <td><p className='recordsData'>passOutYear</p></td>
                </tr> */}
                    <tr>
                    <td><p className='recordsData'>Course </p></td>
                    <td><p className='recordsData'>{loadStudentProfile.course}</p></td>
                </tr>
                   <tr>
                    <td><p className='recordsData'>emplyomentStatus </p></td>
                    <td><p className='recordsData'>{loadStudentProfile.emplyomentStatus}</p></td>
                </tr>
                 <tr>
                    <td><p className='recordsData'>TechnologyTraining</p></td>
                    <td><p className='recordsData'>{loadStudentProfile.TechnologyTraining}</p></td>
                </tr>
                <tr>
                    <td><p className='recordsData'>Exit Mark</p></td>
                    <td><p className='recordsData'>{loadStudentProfile.exitExamMark}</p></td>
                </tr>
                </tbody>
                
            </table>            
            }
          {
           updateMode && <div>
            <label htmlFor="qualification">qualification</label>
            <input disabled={user?.role ==='employee'  ? true : false} type="text" onChange={handleChange}  value={loadStudentProfile.HighestQualification} name="HighestQualification" />
            <label htmlFor="skills">skills</label>
            <input disabled={user?.role ==='employee'  ? true : false} type="text" onChange={handleChange} value={loadStudentProfile.skillset} name="skillset" />
            <label htmlFor="emplyomentStatus">emplyomentStatus</label>
            <input disabled={user?.role ==='employee'  ? true : false} type="text" onChange={handleChange} value={loadStudentProfile.emplyomentStatus} name="emplyomentStatus" />
            <label htmlFor="Course">Course</label>
            <input disabled={user?.role ==='admin' ? false : true} onChange={handleChange} type="text" name="course" value={loadStudentProfile.course}  />
            <label htmlFor="TechnologyTraining">TechnologyTraining</label>
            <input disabled={user?.role ==='employee'  ? true : false} type="text" name="TechnologyTraining" onChange={handleChange} value={loadStudentProfile.TechnologyTraining}  />
            <label  htmlFor="qualification">Exit exam mark</label>
            <input disabled={user?.role ==='admin' || user?.role ==='employee'  ? false : true} type="text" onChange={handleChange}  value={loadStudentProfile.exitExamMark} name="exitExamMark"  />
            </div>
            
          }  
            { updateMode && <button type='submit' className='studentProfileUpdate' >update</button>}     
         </div>
        </article>
     
    </section>
    </div>
    </form>

    </section>    
    </>
  )
}

export default StudentProfile

import React,{useEffect, useState} from 'react'
import {useNavigate,useParams } from 'react-router-dom'
import Header from '../../components/header/Header'
import { useGlobalContext } from '../../context'
import {faCamera, faTrash, faUserEdit} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './EmployeeProfile.css'
import axios from 'axios'
import sipnner from '../../images/spinner.gif'
function EmployeeProfile() {
    const {id}=useParams()
    const navigate=useNavigate()
    const {user,setSuccess,setError}=useGlobalContext()
    const [editOpen,setEditOpen]=useState(false)
    const [UpdateUser,setUpdateUser]=useState({})
    const [imageUploadLoading,setImageUploadLoading]=useState(false)

useEffect(()=>{
const loadSingleEmployee=async()=>{
    console.log(id)
try {
     const response=await axios.get(`/api/employee/${id}`,{withCredentials:true})
    setUpdateUser(response.data)
    console.log()
} catch (error) {
    console.log(error.response)
    setError(error.response.msg)    
}
}   
loadSingleEmployee()
},[])



const uploadImage=async(e)=>{
    setImageUploadLoading(true)
    const data=new FormData()
    data.append('image',e.target.files[0])

    try {
        const upload=await axios.post('/api/fileupload',data)
    setUpdateUser({...UpdateUser,photo:upload.data.image})
    setImageUploadLoading(false)
    console.log(upload)
    } catch (error) {
       setError(error.response.data.msg) 
    setImageUploadLoading(false)
    }
}

 const handleChange=(e)=>{
    const {name,value}=e.target
    setUpdateUser({...UpdateUser,[name]:value})
}

const HandleSubmit=async(e)=>{
    e.preventDefault()
    console.log(UpdateUser)
    
    try {
     const response=await axios.patch(`/api/employee/${UpdateUser?._id}`,UpdateUser)
    console.log(response)
    setSuccess(response.data.msg)
    navigate('/')
    } catch (error) {
        setError(error.response.msg)
    console.log(error.response)

    }
}
return (<>
    <Header/>
    <section>
            <form className='outerContaier' onSubmit={HandleSubmit}>

        <article className='employeeProfileContainer'>
        <div className='employeeProfile'>
            <div className='userProfilePic'>
        <div className='imageHandleSection'>
        <img  className='employeeImg' src={imageUploadLoading ? sipnner : UpdateUser.photo} alt={user?.name} />
       {
           editOpen && <div>      
        <label className='imageCam' htmlFor="imageUpload"><FontAwesomeIcon icon={faCamera}/></label>
        <input type="file" onChange={uploadImage} style={{display:'none'}} name="imageUpload" id="imageUpload" />
     </div> 
       }
         
        </div>

            </div>
       <label  className='EmployeeName' htmlFor="Employee Name">Employee Name :</label>
         <br />   
         <div className='employeeProfileName'>
        {
            !editOpen && <>
        <h3 className='employeeuser'> {UpdateUser?.name}</h3>
        <div className='updatesection'>
         <FontAwesomeIcon  className='employeeTrash' icon={faTrash}/>
       <FontAwesomeIcon onClick={()=>setEditOpen(true)} className='employeeEdit' icon={faUserEdit}/>
        </div>
        </>
        }
        {
            editOpen && <input value={UpdateUser?.name} name='name' onChange={handleChange} className='employeeNameInput' type="text"  />       
        }
        </div>

        {/* Email */}
        <label  className='EmployeeName' htmlFor="EmployeeEmail">Email :</label>
         <br />   
         <div className='employeeProfileName'>

        {
            !editOpen && <div className='employeeProfileEmail'>
        <h4 className='employeeEmail'>{UpdateUser?.email}</h4>
        </div>
        }
        {
            editOpen && <input value={UpdateUser.email} onChange={handleChange} className='employeeNameInput' type="text" name='email'  />
        }
        </div>

        {/* roles */}
        <label  className='EmployeeName' htmlFor="EmployeeRoles">Roles :</label>
         <br /> 

         <div className='employeeProfileName'>
        {
            !editOpen && <h4 className='employeeEmail'>{UpdateUser?.roles}</h4>
        }
        {
            editOpen && <input disabled={user?.role==='admin' ? false : true} value={UpdateUser.roles} onChange={handleChange} className='employeeNameInput' type="text" name='roles'  />
        }
        </div>
        </div>
        {/* about */}
         <div className='AboutSection'>
        <div className='aboutsetionheading'>
            <h3>About</h3>
        </div>
        <div className='paragraphContainer'>
            {
                !user?.about && !editOpen && user?.role==='admin' ? <h3 className='somethingabout'>About is not Updated...</h3> : <h3 className='somethingabout'>say something About you...</h3>
            }
            {
            user?.about && <p className='paragraph'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste nostrum magnam quaerat nulla ut consequatur placeat blanditiis sapiente, quod omnis maxime laborum dolore accusantium non sint molestias id commodi veniam?</p>
            }
            {
                editOpen && <textarea name="about" value={user?.about}  onChange={handleChange} placeholder='Type here ...' id="" cols="30" rows="10"></textarea>
            }
        </div>
           {editOpen && <button className='updateEmployeeBtn' >Update</button>}
        
        </div>   
        </article>
        </form>
            
    </section>
  </>)
}

export default EmployeeProfile
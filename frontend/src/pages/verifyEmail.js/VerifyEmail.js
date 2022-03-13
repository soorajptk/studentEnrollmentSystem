import axios from 'axios'
import React from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
import { useGlobalContext } from '../../context'
import Header from '../../components/header/Header'
import './VerifyEmail.css'
const useQuery=()=>{
    return new URLSearchParams(useLocation().search) 
}
function VerifyEmail() {
    const navigate=useNavigate()
    const {setSuccess,setError}=useGlobalContext()
    const query=useQuery()
const verify=async()=>{
    try {
    const  res=await axios.post('/api/auth/verify-email',{verificationToken:query.get('token'),email:query.get('email'),role:query.get('role')})
    setSuccess(res.data.msg) 
    navigate('/login')
    } catch (error) {
        console.log(error.response)
    setError(error.response.data.msg) 
      navigate('/register')
    }
}

  return (
    <div className='verifyEmail'>
      <Header/>
        <button onClick={verify}>click here to verify</button>        
        
        
    </div>
  )
}

export default VerifyEmail
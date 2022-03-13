import React, { useState,useEffect } from 'react'
import axios from 'axios'
import './Login.css'
import { useGlobalContext } from '../../context'
import { useNavigate,Link } from 'react-router-dom'
import {faCheck,faTimes,faInfoCircle} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Header from '../../components/header/Header'
const EMAIL_REGEX=/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
const PWD_REGEX=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
axios.defaults.withCredentials=true


function Login() {
const navigate=useNavigate()
const  {setUser,setLoading,setSuccess,setError}=useGlobalContext()
//email
const [email,setEmail]=useState('')
const [validEmail,setValidEmail]=useState(false)
const [focusEmail,setFocusEmail]=useState(false)
//role
const [role,setRole]=useState('')
const [validRole,setValidRole]=useState(false)
const [focusRole,setFocusRole]=useState(false)
//pwd
const [password,setPassword]=useState('')
const [validPassword,setValidPassword]=useState(false)
const [focusPassword,setFocusPassword]=useState(false)

//email
useEffect(()=>{
const result =EMAIL_REGEX.test(email)
setValidEmail(result)
},[email])

//role
useEffect(()=>{
const result= role ? true : false
setValidRole(result)
},[role])

//password
useEffect(()=>{
const result =PWD_REGEX.test(password)
setValidPassword(result)
},[password])


    const handleSubmit=async(e)=>{
        e.preventDefault()
        setLoading(true)
        try {
            let test=PWD_REGEX.test(password)
            let test1=EMAIL_REGEX.test(email)
            console.log(!role)
            if(!test || !test1 || !role){
                setLoading(false)
                setError('please provide your credentials')
                return console.log('please fill your credentials')
            }

            const {data}=await axios.post('/api/auth/login',{email,password,role},{withCredentials:true})
            console.log(data,"response data")
            setUser(data.user)
            setSuccess('logged in successfully')
            navigate(`/`)
            setLoading(false)
        } catch (error) {
        setLoading(false)
        setError(error.response.data.msg) 
        console.log(error.response)
        }
    }

    return (<>
            <Header name={'Loginheader'}/>
    <div className='login'>
        <div className='loginTitle'>
        <h2>Login</h2>
        </div>
        <form  onSubmit={handleSubmit}>
        <label className='loginLabel' htmlFor="email">email</label>
        <div className='inpdiv'>
            {
               email && validEmail && <FontAwesomeIcon className='ValidationIconGreen' icon={faCheck}/> 
            }
         {
             focusEmail && email && !validEmail && <FontAwesomeIcon className='ValidationIconRed' icon={faTimes}/>
         }
        <input  onChange={(e)=>setEmail(e.target.value)}  onFocus={()=>setFocusEmail(true)} onBlur={()=>setFocusEmail(false)} className='loginInp' type="email"  name='email'  id="email" />
          <p className={focusEmail && email && !validEmail ? 'instructions' : 'offscreen'}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                     eg : abc@gmail.com</p>
        </div>
        <label htmlFor="role" className='loginLabel'>role</label>
        <br />
          <div className='inpdiv'>
            {
                role && validRole && <FontAwesomeIcon className='ValidationIconGreen' icon={faCheck}/> 
            }
         {
             focusRole && !role && !validRole && <FontAwesomeIcon className='ValidationIconRed' icon={faTimes}/>
         }
        <select onChange={(e)=>setRole(e.target.value ==='choose' ? '' : e.target.value)} onFocus={()=>setFocusRole(true)} onBlur={()=>setFocusRole(false)}  className='loginSelect' name="role"  id="role">
          <option value="choose">Choose</option>
          <option value="admin">Admin</option>
            <option value="employee">employee</option>
             <option value="student">Student</option>
        </select>
        </div>
         <br />       
        <label className='loginLabel' htmlFor="password">password</label>
         <div className='inpdiv'>
            {
                password && validPassword && <FontAwesomeIcon className='ValidationIconGreen' icon={faCheck}/> 
            }
         {
             focusPassword && password && !validPassword && <FontAwesomeIcon className='ValidationIconRed' icon={faTimes}/>
         }
        <input type="password"  onChange={(e)=>setPassword(e.target.value)} onFocus={()=>setFocusPassword(true)} onBlur={()=>setFocusPassword(false)}  name='password' id="password" />
         </div>
         <div className='registerLink'> <span>Don't have acoount ?</span>
       <Link to={'/register'} >Signup Now</Link> 
        </div>
   
        <button className='loginbtn' type='submit'>submit</button>
    </form>
    </div>
    </>

  )
}

export default Login
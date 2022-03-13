
import React, { useEffect, useState } from 'react'
import './EmployeeRegister.css'
import Header from '../../components/header/Header'
import {faCheck,faTimes,faInfoCircle,faCamera} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import axios from 'axios'
import spinner from '../../images/spinner.gif'
import Modal from '../../components/modal/Modal'
import { useGlobalContext } from '../../context'
import { Link } from 'react-router-dom'

const USER_REGEX=/^[a-zA-z][a-zA-Z0-9_]{3,23}$/;
const PWD_REGEX=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const EMAIL_REGEX=/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/






function EmployeeRegister() {
    const {setLoading,setRgstrsuccess,Rgstrsuccess,setError}=useGlobalContext()



   const [photo,setPhoto]=useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png')
    const [imgUploadLoading,setImgUploadLoading]=useState(false)

    const [user,setUser]=useState('')
    const [validName,setvalidName]=useState(false)
    const [userFocus,setUserFocus]=useState(false)
    

    const [email,setEmail]=useState('')
    const [validEmail,setvalidEmail]=useState(false)
    const [emailFocus,setEmailFocus]=useState(false)

    const [roles,setRoles]=useState('')
    const [validRoles,setValidRoles]=useState(false)
    const [RolesFocus,setRolesFocus]=useState(false)


     const [pwd,setPwd]=useState('')
    const [validPwd,setvalidPwd]=useState(false)
    const [pwdFocus,setPwdFocus]=useState(false)
    
    
    const [matchPwd,setMatchPwd]=useState('')
    const [validMatch,setvalidMatch]=useState(false)
    const [matchFocus,setMatchFocus]=useState(false)

    
    useEffect(()=>{
        const result=USER_REGEX.test(user)
        setvalidName(result)
    },[user])

    useEffect(()=>{
        const result=EMAIL_REGEX.test(email)
        setvalidEmail(result)
    },[email])

    useEffect(()=>{
        const result=roles.length > 0 && 30 >= roles.length 
        console.log(result)
        setValidRoles(result)
    },[roles])


    useEffect(()=>{
        const result=PWD_REGEX.test(pwd)
        setvalidPwd(result)
        const match= pwd === matchPwd
        setvalidMatch(match)
    },[pwd,matchPwd])



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
       setError(err.response.data.msg) 

         setImgUploadLoading(false)   
    }
    }


    const handleSubmit=async(e)=>{
        e.preventDefault();
      setLoading(true)

        const tst2=USER_REGEX.test(user)
        const tst3=EMAIL_REGEX.test(email)

        if(!tst2 || !tst3 ||  !user || !email || !pwd || !roles){
            setError('invalid entry')
      setLoading(false)
        return;
        }
        try {
    let data={name:user,email,password:pwd,photo,roles}
        console.log(data)
            const response=await axios.post('/api/auth/employer_register',data)
              console.log(response)
                setLoading(false)
                setRgstrsuccess(response.data.msg)
        } catch (error) {

                setLoading(false)
              
            console.log(error.response)
                setError(error.response.data.msg)
            
        }                
    }



  return (
   <main className='register'>
            <Header/>
       {
            Rgstrsuccess && <Modal/>

       }
            <div className='rgsterheading'>
            <h2 className='heading'> register</h2>
            <Link to={'/register'} className='switchRegs' >Student Register</Link>
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
        {/* username */}

            <div className='employeeRegisterfield'>
                <label  htmlFor="username">Name:</label>                
                <br/>
                <div className='registerInp'>
                    <div className='registerIcon'>
                    <span className={validName ? 'valid' : 'hide'}>
                    <FontAwesomeIcon icon={faCheck}/>
                </span>
                 <span className={ validName || !user  ? 'hide' : 'invalid'}>
                    <FontAwesomeIcon icon={faTimes}/>
                </span>
                    </div>
                    
                <input className='inpts'  type="text" id='username' value={user}  autoComplete='off' onChange={(e)=>setUser(e.target.value)} required  
                onFocus={()=>setUserFocus(true)}
                onBlur={()=>setUserFocus(false)}
                />
                </div>
                <p className={userFocus && user && !validName ? 'instructions' : 'offscreen'}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 to 24 characters. <br/>
                    Must begin with a letter. <br/>
                    Letters,numbers,underscores,hphens allowed.   
                </p>
            </div >

            {/* email */}

             <div className='employeeRegisterfield'>
                <label htmlFor="email">Email: </label>
                    <br/>
                <div className='registerInp'>
                    <div className='registerIcon'>
                <span className={validEmail ? 'valid' : 'hide'}>
                    <FontAwesomeIcon icon={faCheck}/>
                </span>
                 <span className={ validEmail || !email  ? 'hide' : 'invalid'}>
                    <FontAwesomeIcon icon={faTimes}/>
                </span>
                </div>
                <input className='inpts' type="text" id='email' value={email}  autoComplete='off' onChange={(e)=>setEmail(e.target.value)} required  
                onFocus={()=>setEmailFocus(true)}
                onBlur={()=>setEmailFocus(false)}
                />
                </div>
                <p className={emailFocus && email && !validEmail ? 'instructions' : 'offscreen'}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                     eg : abc@gmail.com</p>
            </div >

              <div className='employeeRegisterfield'>
                <label htmlFor="Roles">Roles:</label>
                 <div className='registerInp'>
                    <div className='registerIcon'>

                <span className={ roles && validRoles ? 'valid' : 'hide'} >
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                    <span className={  validRoles || !roles  ? 'hide' : 'invalid'} >
                    <FontAwesomeIcon icon={faTimes}/>
                </span>
                </div>
                <input className='inpts' type="TechnologyTraining" value={roles} name="TechnologyTraining" id="TechnologyTraining" onChange={(e)=>setRoles(e.target.value)} onFocus={()=>setRolesFocus(true)} onBlur={()=>setRolesFocus(false)}  autoComplete='off' required />
                </div>
                <p className={RolesFocus && roles && !validRoles ? 'instructions' : 'offscreen'}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                   &nbsp;
                       maximum 30 characters </p>
             </div>
                   
    {/* "password" */}            
                <div className='employeeRegisterfield'>
                <label htmlFor="password">password:</label>
                <br/>

                 <div className='registerInp'>
                    <div className='registerIcon'>
                <span className={validPwd ? 'valid' : 'hide'}>
                    <FontAwesomeIcon icon={faCheck}/>
                </span>
                 <span className={ validPwd || !pwd  ? 'hide' : 'invalid'}>
                    <FontAwesomeIcon icon={faTimes}/>
                </span>
                </div>
                <input className='inpts'
                type="password" id='password' value={pwd}  autoComplete='off' onChange={(e)=>setPwd(e.target.value)} required  
                onFocus={()=>setPwdFocus(true)}
                onBlur={()=>setPwdFocus(false)}
                
                />
                </div>
              <p  className={pwdFocus && pwd && !validPwd ? 'instructions' : 'offscreen'}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    &nbsp; 8 to 24 characters. <br/>
                    Must include uppercase and lowercase letters, a number and a special character. <br/>
                    Letters,numbers,underscores,hphens allowed.<br/>
                    Allowed special characters:!@#$%   
                </p>
            </div >

            <div className='employeeRegisterfield'>
                <label htmlFor="confirmpassword">confirm Password:</label>
                <br/>

                 <div className='registerInp'>
                    <div className='registerIcon'>

                  <span className={validMatch && pwd ? 'valid' : 'hide'}>
                    <FontAwesomeIcon icon={faCheck}/>
                </span>
                 <span className={ validMatch || !matchPwd ? 'hide' : 'invalid'}>
                    <FontAwesomeIcon icon={faTimes}/>
                </span>
              
                   </div>
              <input className='inpts'
                type="password" id='confirmpassword' value={matchPwd} autoComplete='off' onChange={(e)=>setMatchPwd(e.target.value)} required  
                onFocus={()=>setMatchFocus(true)}
                onBlur={()=>setMatchFocus(false)}
                />
                </div>
                    <p  className={matchFocus  && !validMatch ? 'instructions' : 'offscreen'}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    &nbsp;
                    must match the first password input field
                      </p>


            </div>
            <button className='employeergstrbtn'  type='submit'>register</button>
            </form>
            </section>
        </main>
    )
}

export default EmployeeRegister
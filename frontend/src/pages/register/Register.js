import React,{useRef,useEffect,useState} from 'react'

import './Register.css'
import {faCheck,faTimes,faInfoCircle,faCamera} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import axios from 'axios'
import spinner from '../../images/spinner.gif'
import Modal from '../../components/modal/Modal'
import Header from '../../components/header/Header'
import { useGlobalContext } from '../../context'
import { Link } from 'react-router-dom'
const USER_REGEX=/^[a-zA-z][a-zA-Z0-9_]{3,23}$/;
const PWD_REGEX=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const EMAIL_REGEX=/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
const PHONE_REGEX= /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/

function Register() {
    const {setLoading,setRgstrsuccess,setError,Rgstrsuccess}=useGlobalContext()
    const [CourseDetails,setCourseDetails]=useState([])
 
   const [photo,setPhoto]=useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png')
    const [imgUploadLoading,setImgUploadLoading]=useState(false)

    const [user,setUser]=useState('')
    const [validName,setvalidName]=useState(false)
    const [userFocus,setUserFocus]=useState(false)
    

    const [email,setEmail]=useState('')
    const [validEmail,setvalidEmail]=useState(false)
    const [emailFocus,setEmailFocus]=useState(false)

    const [phone,setPhone]=useState('')
    const [validPhone,setValidPhone]=useState(false)
    const [phoneFocus,setPhoneFocus]=useState(false)

    const [address,setAddress]=useState('')
    const [validAddress,setValidAddress]=useState(false)
    const [addressFocus,setAddressFocus]=useState(false)

    const [qualification,setQualification]=useState('')
    const [validQualification,setValidQualification]=useState(false)
    const [qualificationFocus,setQualificationFocus]=useState(false)

    const [passOutYear,setpassOutYear]=useState('')
    const [validpassOutYear,setValidpassOutYear]=useState(false)
    const [passOutYearFocus,setpassOutYearFocus]=useState(false)

    const [skillset,setskillset]=useState('')
    const [validskillset,setValidskillset]=useState(false)
    const [skillsetFocus,setskillsetFocus]=useState(false)

    const [emplyomentStatus,setemplyomentStatus]=useState('')
    const [validemplyomentStatus,setValidemplyomentStatus]=useState(false)
    const [emplyomentStatusFocus,setemplyomentStatusFocus]=useState(false)



    const [TechnologyTraining,setTechnologyTraining]=useState('')
    const [validTechnologyTraining,setValidTechnologyTraining]=useState(false)
    const [TechnologyTrainingFocus,setTechnologyTrainingFocus]=useState(false)


    const [course,setcourse]=useState('')
    const [validcourse,setValidcourse]=useState(false)
    const [courseFocus,setcourseFocus]=useState(false)

    const [fee,setFee]=useState({CourseName:'',Fee:''})
    const Fees=useRef()

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
        const result=PHONE_REGEX.test(phone)
        setValidPhone(result)
    },[phone])

    useEffect(()=>{
        const result=address.length > 3 && 30 > address.length 
        setValidAddress(result)
    },[address])


    useEffect(()=>{
        const result=qualification==='choose' ? false : true 
        setValidQualification(result)
    },[qualification])

    useEffect(()=>{
        const result=Number(passOutYear) > 2000 && new Date().getFullYear() >= Number(passOutYear) 
        console.log(result)
        setValidpassOutYear(result)
    },[passOutYear])

    useEffect(()=>{
        const result=skillset.length > 0 && 30 >= skillset.length 
        console.log(result)
        setValidskillset(result)
    },[skillset])


    useEffect(()=>{
        const result=emplyomentStatus==='choose' ? false : true 
        setValidemplyomentStatus(result)
    },[emplyomentStatus])


    useEffect(()=>{
        const result=TechnologyTraining.length > 0 && 30 >= TechnologyTraining.length 
        console.log(result)
        setValidTechnologyTraining(result)
    },[TechnologyTraining])

    useEffect(()=>{
        const result=course==='choose' ? false : true 
        setValidcourse(result)
       let data=CourseDetails.filter((item)=>item.CourseName===course)
       let res=data.length < 1 ? [{CourseName:'',Fee:''}] : data

        setFee(...res) 
    },[course])

    
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
       setError(err.response.data.msg) 

         setImgUploadLoading(false)   
    }
    }

    useEffect(()=>{
        const loadCourse=async()=>{
            try{
            const response=await axios.get('/api/course/allcourse')
         const filterd =response.data.course.map((item)=>{
            const {name,courseFee,CourseId}=item
            return {CourseName:name,Fee:courseFee,CourseId}
         })    
            setCourseDetails(filterd)
            }catch(err){
            console.log(err)    
            }
    }    
    loadCourse()     
    },[])

    const handleSubmit=async(e)=>{
        e.preventDefault();
      setLoading(true)

        const tst1=PWD_REGEX.test(pwd)
        const tst2=USER_REGEX.test(user)
        const tst3=EMAIL_REGEX.test(email)
        const tst4=PHONE_REGEX.test(phone)

        if(!tst1 || !tst2 || !tst3 || !tst4 || !Fees.current.value || !user || !email || !pwd || !phone || !skillset || !course || !passOutYear || !TechnologyTraining || !address || !qualification || !emplyomentStatus ){
            setError('invalid entry')
            console.log("erroroor")
      setLoading(false)
        return;
        }
        try {
        let fe=Fees.current.value
    let data={name:user,email,password:pwd,phone,courseFee:fe,skillset,course,passOutYear,TechnologyTraining,Address:address,HighestQualification:qualification,role:"student",emplyomentStatus,photo}
        console.log(data)
            const response=await axios.post('/api/auth/student_register',data)
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
    <section className='regContainer'>
        {Rgstrsuccess && <Modal />}
        <form onSubmit={handleSubmit} >
            <h2> register</h2>
            <Link to={'/employeeregister'} className='switchReg'>Employee Register</Link>

        {/* photo */}

                <div className='RegisterUserImgContainer'>
                <label className='RegisterUserImgLabel' htmlFor="photo"><FontAwesomeIcon icon={faCamera} /></label>
                <img className='RegisterUserImg' src={photo} alt="userImage"  />
                    <input style={{display:'none'}} onChange={handleUpload} id='photo' name='photo' type="file" />
                    {
                        imgUploadLoading && <img className='imgloading' src={spinner} alt="spinner" />
                    }
                   
                </div>
        {/* username */}

            <div className='inp'>
                <label  htmlFor="username">username:</label>                
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
                    
                <input  type="text" id='username' value={user}  autoComplete='off' onChange={(e)=>setUser(e.target.value)} required  
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

             <div className='inp'>
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
                <input  type="text" id='email' value={email}  autoComplete='off' onChange={(e)=>setEmail(e.target.value)} required  
                onFocus={()=>setEmailFocus(true)}
                onBlur={()=>setEmailFocus(false)}
                />
                </div>
                <p className={emailFocus && email && !validEmail ? 'instructions' : 'offscreen'}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                     eg : abc@gmail.com</p>
            </div >
            
            {/* phone */}
             <div className='inp'>
                <label htmlFor="phone">Mobile Num.</label>
                 <div className='registerInp'>
                    <div className='registerIcon'>
                <span className={ phone && validPhone ? 'valid' : 'hide'} >
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                    <span className={  validPhone || !phone  ? 'hide' : 'invalid'} >
                    <FontAwesomeIcon icon={faTimes}/>
                </span>
                </div>
                <input type="text" value={phone} name="phone" id="phone" onChange={(e)=>setPhone(e.target.value)} onFocus={()=>setPhoneFocus(true)} onBlur={()=>setPhoneFocus(false)}  autoComplete='off' required />
                </div>
                <p className={phoneFocus && phone && !validPhone ? 'instructions' : 'offscreen'}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                   &nbsp;
                    XXX-XXX-XXXX,
                    XXX.XXX.XXXX,
                    XXX XXX XXXX </p>
             </div>   
            {/* address */}

             <div className='inp'>
                <label htmlFor="address">Address</label>
                 <div className='registerInp'>
                    <div className='registerIcon'>

                <span className={ address && validAddress ? 'valid' : 'hide'} >
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                    <span className={  validAddress || !address  ? 'hide' : 'invalid'} >
                    <FontAwesomeIcon icon={faTimes}/>
                </span>
                </div>
                <input type="text" value={address} name="address" id="address" onChange={(e)=>setAddress(e.target.value)} onFocus={()=>setAddressFocus(true)} onBlur={()=>setAddressFocus(false)}  autoComplete='off' required />
                </div>
                <p className={addressFocus && address && !validAddress ? 'instructions' : 'offscreen'}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                   &nbsp;
                       Atleast minimum 3 characters <br />
                       maximum 30 characters </p>
             </div>
            {/* "HighestQualification" */}

            <div className='inp'>
                <label htmlFor="HighestQualification">HighestQualification</label>
                 <div className='registerInp'>
                    <div className='registerIcon'>

                <span className={ qualification && validQualification ? 'valid' : 'hide'} >
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                    <span className={  validQualification || !qualification  ? 'hide' : 'invalid'} >
                    <FontAwesomeIcon icon={faTimes}/>
                </span>
                </div>
                <select name="HighestQualification" id="HighestQualification"  onChange={(e)=>setQualification(e.target.value)} onFocus={()=>setQualificationFocus(true)} onBlur={()=>setQualificationFocus(false)}  autoComplete='off' required >
                    <option value="choose">choose</option>
                    <option value="M.tech">M.tech</option>
                    <option value="B.tech">B.tech</option>
                    <option value="MCA">MCA</option>
                    <option value="MSC CS">MSC CS</option>
                    <option value="BSC CS">BSC CS</option>
                    <option value="BCA">BCA</option>
                    <option value="Others">Others</option>
                </select>
                </div>
                <p className={qualificationFocus && qualification && !validQualification? 'instructions' : 'offscreen'}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                   &nbsp;
                       please choose your  Highest Qualification
                       </p>
             </div>
             {/* "passOutYear" */}

                <div className='inp'>
                <label htmlFor="passOutYear">Year of passout</label>
                 <div className='registerInp'>
                    <div className='registerIcon'>

                <span className={ passOutYear && validpassOutYear ? 'valid' : 'hide'} >
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                    <span className={  validpassOutYear || !passOutYear  ? 'hide' : 'invalid'} >
                    <FontAwesomeIcon icon={faTimes}/>
                </span>
                </div>
                <input name="passOutYear" value={passOutYear} id="passOutYear" type={'number'} onChange={(e)=>setpassOutYear(e.target.value)} onFocus={()=>setpassOutYearFocus(true)} onBlur={()=>setpassOutYearFocus(false)}  autoComplete='off' required />
                  </div>
                <p className={passOutYearFocus && passOutYear && !validpassOutYear ? 'instructions' : 'offscreen'}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                   &nbsp;
                       year of passout should be 2000 above
                       </p>
             </div>

             {/* "skillset" */}

             <div className='inp'>
                <label htmlFor="skillset">Skillset</label>
                 <div className='registerInp'>
                    <div className='registerIcon'>

                <span className={ skillset && validskillset ? 'valid' : 'hide'} >
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                    <span className={  validskillset || !skillset  ? 'hide' : 'invalid'} >
                    <FontAwesomeIcon icon={faTimes}/>
                </span>
                </div>
                <input type="text" value={skillset} name="skillset" id="skillset" onChange={(e)=>setskillset(e.target.value)} onFocus={()=>setskillsetFocus(true)} onBlur={()=>setskillsetFocus(false)}  autoComplete='off' required />
                    </div>
                <p className={skillsetFocus && skillset && !validskillset ? 'instructions' : 'offscreen'}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                   &nbsp;
                       Atleast minimum 3 characters <br />
                       maximum 30 characters </p>
             </div>



            {/* "emplyomentStatus" */}
               
                 <div className='inp'>
                <label htmlFor="emplyomentStatus">Emplyoment Status</label>
                 <div className='registerInp'>
                    <div className='registerIcon'>

                <span className={ emplyomentStatus && validemplyomentStatus ? 'valid' : 'hide'} >
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                    <span className={  validemplyomentStatus || !emplyomentStatus  ? 'hide' : 'invalid'} >
                    <FontAwesomeIcon icon={faTimes}/>
                </span>
                </div>
                <select name="emplyomentStatus" id="emplyomentStatus"  onChange={(e)=>setemplyomentStatus(e.target.value)} onFocus={()=>setemplyomentStatusFocus(true)} onBlur={()=>setemplyomentStatusFocus(false)}  autoComplete='off' required >
                    <option value="choose">choose</option>
                    <option value="student">Student</option>
                    <option value="employee">Employee</option>
                    <option value="selfemployeed">Self employed</option>
                </select>
                </div>
                <p className={emplyomentStatusFocus && emplyomentStatus && !validemplyomentStatus ? 'instructions' : 'offscreen'}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                   &nbsp;
                       please choose your Emplyoment Status
                       </p>
             </div>


        {/* "TechnologyTraining" */}

            <div className='inp'>
                <label htmlFor="TechnologyTraining">Technology Training</label>
                 <div className='registerInp'>
                    <div className='registerIcon'>

                <span className={ TechnologyTraining && validTechnologyTraining ? 'valid' : 'hide'} >
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                    <span className={  validTechnologyTraining || !TechnologyTraining  ? 'hide' : 'invalid'} >
                    <FontAwesomeIcon icon={faTimes}/>
                </span>
                </div>
                <input type="TechnologyTraining" value={TechnologyTraining} name="TechnologyTraining" id="TechnologyTraining" onChange={(e)=>setTechnologyTraining(e.target.value)} onFocus={()=>setTechnologyTrainingFocus(true)} onBlur={()=>setTechnologyTrainingFocus(false)}  autoComplete='off' required />
                </div>
                <p className={TechnologyTrainingFocus && TechnologyTraining && !validTechnologyTraining ? 'instructions' : 'offscreen'}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                   &nbsp;
                       maximum 30 characters </p>
             </div>
    {/* "course":, */}

               <div className='inp'>
                <label htmlFor="course">course</label>
                 <div className='registerInp'>
                    <div className='registerIcon'>

                <span className={ course && validcourse ? 'valid' : 'hide'} >
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                    <span className={  validcourse || !course  ? 'hide' : 'invalid'} >
                    <FontAwesomeIcon icon={faTimes}/>
                </span>
                </div>
                <select name="course" id="course"  onChange={(e)=>setcourse(e.target.value)} onFocus={()=>setcourseFocus(true)} onBlur={()=>setcourseFocus(false)}  autoComplete='off' required >
                    <option value="choose">choose</option>
                   {
                       CourseDetails.map((item,ind)=>{
                           const {CourseName}=item
                           return ( <option key={ind} value={CourseName}>{CourseName}</option>)
                       })
                   }
                </select>
                </div>
                <p className={courseFocus && course && !validcourse ? 'instructions' : 'offscreen'}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                   &nbsp;
                       please choose your Course
                       </p>
             </div>
                {/* "courseFee" */}
            
                   <div className='inp'>
                   <input type="text" value={fee?.Fee} ref={Fees} disabled={true} required={true}  />
                   </div>

    {/* "photo": */}
    {/* "role" */}
            
            
    {/* "password" */}            
                <div className='inp'>
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
                <input 
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

            <div className='inp'>
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
              <input 
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
            <button  type='submit'>register</button>
        </form>
    </section>
    </main>
    )
}

export default Register
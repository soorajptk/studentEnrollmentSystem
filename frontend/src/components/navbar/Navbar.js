
import React, { useRef,useEffect, useState } from 'react'
import './Navbar.css'
import logo from '../../images/ictaklogo.png'
import {Link} from 'react-router-dom'
import {useGlobalContext} from '../../context'
import { navbaraData } from '../../utils/navbarData'
import {useNavigate} from 'react-router-dom'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Navbar() {
  const navigate=useNavigate()
  const {user,removeUser}=useGlobalContext()
const [NavvbarData,setNavabarData]=useState([])
const [navabarScroll,setNvabarScroll]=useState(false)
const [toggle,setToggle]=useState(true)
 const linksContainerRef=useRef() 
 const linksRef=useRef() 

useEffect(()=>{
    if(!user){
      setNavabarData(navbaraData.noUser)
    }
    if(user?.role==='admin'){
      setNavabarData(navbaraData.admin)
    }
    if(user?.role==='employee'){
      setNavabarData(navbaraData.employee)
    }
    if(user?.role==='student'){
      setNavabarData(navbaraData.student)
    }
    
  },[user])

   

  useEffect(()=>{
  const event=window.addEventListener('scroll',()=>{
if(248 < window.scrollY){
    setNvabarScroll(true)
}else{
    setNvabarScroll(false)
}
  })
  return ()=>{
    window.removeEventListener('scroll',event)
    setNvabarScroll(false)
  }
},[])
const handleProfile=()=>{
  if(user?.role==='employee'){
      navigate(`/employeeprofile/${user?._id}`)
  }
if(user?.role==='student'){
      navigate(`/studentprofile/${user?._id}`)
  }
}
  return (
    <section ref={linksContainerRef} className={navabarScroll ? 'navbarContainer navbarBg' : 'navbarContainer'}>
      <div className='navbarSubContainer'>
      <div className='navbarLogoHeader'>
      <img className='logoImg' src={logo} alt="ictaklogo" />
      <FontAwesomeIcon onClick={()=>setToggle(!toggle)} className='hambuger' icon={faBars}/>

      </div>

    <div  ref={linksRef} className={ toggle ? 'navbarLinks navbarLinksCLICK' : "navbarLinks" }> 
        <Link  className={ navabarScroll ? 'navbarLink navbarLinkChange' : 'navbarLink'} to={'/'} >Home</Link>
       
       {

         NavvbarData.map((item,ind)=>{
           const {name,link}=item
          return (
            <Link key={ind} className={ navabarScroll ? 'navbarLink navbarLinkChange' : 'navbarLink'} to={link} >{name}</Link>
          )
          })
       }
      {
        user && <Link onClick={removeUser} className={ navabarScroll ? 'navbarLink navbarLinkChange' : 'navbarLink'} to={'/'} >logout</Link>
      }
      {
        user && user?.role !== 'admin' && <img className='userPic' src={user?.photo} alt="userpic" onClick={handleProfile} />
      }

    </div>
    </div>
    </section>
  )
}

export default Navbar
import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../../context'
import './Modal.css'
function Modal() {
    const {Rgstrsuccess,setRgstrsuccess}=useGlobalContext()
  return (
 
        <main className='modalContainer'>
      <article className='modal'>
        <p className='modalMsg'>{Rgstrsuccess}</p>
         <Link className='modalLink' onClick={()=>setRgstrsuccess('')} to={'/'}>Ok</Link>
      </article>
       </main>

    )
}

export default Modal
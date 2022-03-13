
import React from 'react'
import { useGlobalContext } from '../../context'
import './Header.css'

function Header({name}) {
const {user}=useGlobalContext()
  return (
 <div className={name ? name : 'Homeheader'}>
      <h2 className='userTitle'>{user?.name}</h2>
    </div>
  )
}

export default Header
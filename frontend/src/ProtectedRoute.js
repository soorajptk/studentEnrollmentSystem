import React from 'react'
import {Navigate,useLocation,Outlet} from 'react-router-dom'
import { useGlobalContext } from './context'

function Requireauth({allowedRoles}) {
 const {user}=useGlobalContext()
 const location=useLocation()
 return (
       allowedRoles.find(role=>role===user?.role) ? <Outlet/> : <Navigate to={'/login'} state={{from:location}} replace /> 
    )
 
}
export default Requireauth
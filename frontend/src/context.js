import axios from 'axios'
import React,{createContext, useContext, useEffect, useState} from 'react'

const AppContext=createContext()

export const AppProvider=({children})=>{
const [user,setUser]=useState(null) 
const [isLoading,setLoading]=useState(true)
const [success,setSuccess]=useState('')
const [isError,setError]=useState('')
const [Rgstrsuccess,setRgstrsuccess]=useState('')
const [loadStudents,setLoadStudents]=useState([])
const [PendingStudent,setPendingStudent]=useState([])
const [LoadEmployee,setLoadEmployee]=useState([])
const [PendingEmployee,setPendingEmployee]=useState([])
const [SearchStudent,setSearchStudent]=useState([])
  const [course,setCourse]=useState([])
  const [singleData, setSingleData] = useState({});
const [reload,setReload]=useState('')

const removeUser=async()=>{
    try {
    const {data}=await axios.post('/api/auth/logout',{userId:user.userId,role:user.role},{withCredentials:true})
        console.log(data)
    setUser(null)
    
    } catch (error) {
        setSuccess(error.response)
    }
}

useEffect(()=>{
const checkUser=async()=>{
    try{
        const {data}=await axios.get('/api/auth/showme',{withCredentials:true})
        setUser(data.user)
    setLoading(false)
    }catch(err){
    setLoading(false)

    }

}
    checkUser()
},[])
    
useEffect(()=>{
  let errmsg=setTimeout(() => {
    setSuccess('')
    setError('')
  },5000);
return ()=> clearTimeout(errmsg)
},[isError,success])



  useEffect(()=>{
  const loadCourse=async()=>{
try {
  const data=await axios.get('/api/course/allcourse')
  setCourse(data.data.course)
} catch (error) {
 setError(error.response) 
}
  }  
  loadCourse()  
},[reload])


    return <AppContext.Provider value={{setReload,singleData,setSingleData,course,SearchStudent,setSearchStudent,PendingEmployee,setPendingEmployee,LoadEmployee,setLoadEmployee,PendingStudent,setPendingStudent,loadStudents,setLoadStudents,isError,setError,setLoading,success,setSuccess,isLoading,user,removeUser,setUser,setRgstrsuccess,Rgstrsuccess}} >{children}</AppContext.Provider>
}


export const useGlobalContext=()=>{
   return useContext(AppContext)
}
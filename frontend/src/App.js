import { Routes, Route } from 'react-router-dom'
import './App.css';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Requireauth from './ProtectedRoute'
import { useGlobalContext } from './context';
import VerifyEmail from './pages/verifyEmail.js/VerifyEmail';
import Students from './pages/students/Students';
import MakePayment from './pages/makePayment/makePayment'
import Navbar from './components/navbar/Navbar';
import spinner from './images/spinner.gif'
import ApprovalOfStudent from './pages/ApprovalOfStudent/ApprovalofStudent'
import ApprovalOfEmployee from './pages/ApprovalOfEmployee/ApprovalOfEmployee'
import EmployeeRegister from './pages/employeeRegister/EmployeeRegister';
import EmployeeProfile from './pages/employeeProfile/EmployeeProfile';
import Employee from './pages/employee/Employee'
import CourseView from './pages/CourseView/CourseView'
import SearchStudent from './pages/SearchStudent/SearchStudent'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import AddCourse from './pages/AddCource/AddCourse';
import StudentProfile from './pages/studentProfile/StudentProfile'
import PreviewCourse from './pages/previewCourse/PreviewCourse';
import Footer from './components/footer/footer';
function App() {

  const { isLoading, success, isError } = useGlobalContext()

  if (isLoading) {
    return <main >
      <Navbar />
      <img className='spinner' src={spinner} alt="spinner" />
    </main>
  }

  return (
    <>
      <Navbar />
      <Stack sx={{ width: '100%' }} spacing={2}>
        {
          success && <Alert className='successMsg' variant='filled' severity="success">
            <AlertTitle>Success</AlertTitle>
            <p style={{ color: 'white' }}>{success}</p>
          </Alert>
        }
        {
          isError && <Alert className='successMsg' variant='filled' severity="error">
            <AlertTitle>Error</AlertTitle>
            <p style={{ color: 'white' }}>{isError}</p>
          </Alert>
        }

      </Stack>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
        <Route path='/' element={<Home />} />
        <Route path='/makepayment' element={<MakePayment />} />
        <Route path='/employeeregister' element={<EmployeeRegister />} />
        <Route path='/Courseview' element={<CourseView />} />
        <Route path='/previewCourse/:id' element={<PreviewCourse />} />

        <Route element={<Requireauth allowedRoles={['admin', 'employee']} />}>
          <Route path='/students' element={<Students />} />
        </Route>
        <Route element={<Requireauth allowedRoles={['admin']} />} >
          <Route path='/approvalofstudent' element={<ApprovalOfStudent />} />
        </Route>
        <Route element={<Requireauth allowedRoles={['admin']} />} >
          <Route path='/employees' element={<Employee />} />
        </Route>
        <Route element={<Requireauth allowedRoles={['admin']} />} >
          <Route path='/approvalofemployee' element={<ApprovalOfEmployee />} />
        </Route>
        <Route element={<Requireauth allowedRoles={['admin']} />} >
          <Route path='/searchstudent' element={<SearchStudent />} />
        </Route>
        <Route element={<Requireauth allowedRoles={['admin']} />} >
          <Route path='/addCourse' element={<AddCourse />} />
        </Route>
        <Route element={<Requireauth allowedRoles={['admin', 'employee']} />} >
          <Route path='/employeeprofile/:id' element={<EmployeeProfile />} />
        </Route>
        <Route element={<Requireauth allowedRoles={['admin', 'employee', "student"]} />} >
          <Route path='/studentprofile/:id' element={<StudentProfile />} />
        </Route>
      </Routes>
      <Footer/>
    </>

  );
}

export default App;

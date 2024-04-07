import './App.css'

import { Route, Routes } from 'react-router-dom'

import RequiereAuth from './Components/Auth/RequireAuth.jsx'
import AboutUs from './pages/AboutUs.jsx'
import Contact from './pages/ContactUs.jsx'
import CourseDesc from './pages/Courses/CourseDesc.jsx'
import CourseList from './pages/Courses/CourseList.jsx'
import CreateCourse from './pages/Courses/CreateCourse.jsx'
import Denied from './pages/Denied.jsx'
import HomePage from './pages/Homepage.jsx'
import Login from './pages/Login.jsx'
import NotFound from './pages/NotFound.jsx'
import SignUp from './pages/SignUp.jsx'
import EditProfile from './pages/user/editProfile.jsx'
import Profile from './pages/user/userProfile.jsx'





function App() {
  

  return (
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/about' element={<AboutUs />}/>
        <Route path='/courses' element={<CourseList />}/>
        <Route path='/course/description' element={<CourseDesc />}/>
        <Route element={<RequiereAuth allowedrole={["ADMIN"]}/>}>
            <Route path='/course/create' element={<CreateCourse />}/>
        </Route>
        <Route element={<RequiereAuth allowedrole={["ADMIN","USER"]}/>}>
            <Route path='/user/profile' element={<Profile />}/>
            <Route path='/user/editprofile' element={<EditProfile />}/>
        </Route>
        
        <Route path='/contact' element={<Contact />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/login' element={<Login />}/>

        <Route path='/denied' element={<Denied />}/>

        <Route path='*' element={<NotFound />}/>
      </Routes>
  )
}

export default App

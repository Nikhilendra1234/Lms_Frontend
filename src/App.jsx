import './App.css'

import { Route, Routes } from 'react-router-dom'

import RequiereAuth from './Components/Auth/RequireAuth.jsx'
import AboutUs from './pages/AboutUs.jsx'
import Contact from './pages/ContactUs.jsx'
import CourseDesc from './pages/Courses/CourseDesc.jsx'
import CourseList from './pages/Courses/CourseList.jsx'
import CreateCourse from './pages/Courses/CreateCourse.jsx'
import AddLecture from './pages/Dashboard/AddLecture.jsx'
import DisplayLectures from './pages/Dashboard/DisplayCourse.jsx'
import Denied from './pages/Denied.jsx'
import HomePage from './pages/Homepage.jsx'
import Login from './pages/Login.jsx'
import NotFound from './pages/NotFound.jsx'
import Checkout from './pages/Payment/Checkout.jsx'
import CheckoutFail from './pages/Payment/CheckoutFail.jsx'
import CheckoutSuccess from './pages/Payment/CheckSuccess.jsx'
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
            <Route path='/course/addlecture' element={<AddLecture />}/>
        </Route>

        <Route element={<RequiereAuth allowedrole={["ADMIN","USER"]}/>}>
            <Route path='/user/profile' element={<Profile />}/>
            <Route path='/user/editprofile' element={<EditProfile />}/>
            <Route path='/checkout' element={<Checkout />}/>
            <Route path='/checkout/success' element={<CheckoutSuccess />}/>
            <Route path='/checkout/fail' element={<CheckoutFail />}/>
            <Route path='/course/displaylectures' element={<DisplayLectures />}/>
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

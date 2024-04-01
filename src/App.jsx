import './App.css'

import { Route, Routes } from 'react-router-dom'

import AboutUs from './pages/AboutUs.jsx'
import Contact from './pages/ContactUs.jsx'
import CourseDesc from './pages/Courses/CourseDesc.jsx'
import CourseList from './pages/Courses/CourseList.jsx'
import Denied from './pages/Denied.jsx'
import HomePage from './pages/Homepage.jsx'
import Login from './pages/Login.jsx'
import NotFound from './pages/NotFound.jsx'
import SignUp from './pages/SignUp.jsx'





function App() {
  

  return (
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/about' element={<AboutUs />}/>
        <Route path='/courses' element={<CourseList />}/>
        <Route path='/course/description' element={<CourseDesc />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/login' element={<Login />}/>

        <Route path='/denied' element={<Denied />}/>

        <Route path='*' element={<NotFound />}/>
      </Routes>
  )
}

export default App

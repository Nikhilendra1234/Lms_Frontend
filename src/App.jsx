import './App.css'

import { Route, Routes } from 'react-router-dom'

import AboutUs from './pages/AboutUs.jsx'
import HomePage from './pages/Homepage.jsx'
import NotFound from './pages/NotFound.jsx'
import SignUp from './pages/SignUp.jsx'





function App() {
  

  return (
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/about' element={<AboutUs />}/>
        <Route path='/signup' element={<SignUp />}/>

        <Route path='*' element={<NotFound />}/>
      </Routes>
  )
}

export default App

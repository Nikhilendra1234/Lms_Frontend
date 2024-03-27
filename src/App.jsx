import './App.css'

import { Route, Routes } from 'react-router-dom'

import AboutUs from './pages/AboutUs'
import HomePage from './pages/Homepage'





function App() {
  

  return (
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/about' element={<AboutUs />}/>
      </Routes>
  )
}

export default App

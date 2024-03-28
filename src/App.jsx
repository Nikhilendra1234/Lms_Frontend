import './App.css'

import { Route, Routes } from 'react-router-dom'

import AboutUs from './pages/AboutUs'
import HomePage from './pages/Homepage'
import NotFound from './pages/NotFound'





function App() {
  

  return (
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/about' element={<AboutUs />}/>

        <Route path='*' element={<NotFound />}/>
      </Routes>
  )
}

export default App

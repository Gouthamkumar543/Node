import React from 'react'
import {Routes,Route} from "react-router-dom"
import NavBar from './Components/NavBar/NavBar'
import SignUp from './Components/Pages/SignUp/SignUp'
import Home from './Components/Pages/Home/Home'

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/signup' element={<SignUp />}/>
      </Routes>
    </div>
  )
}

export default App
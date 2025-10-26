import React from 'react'
import NavBar from './Components/NavBar'
import { Route, Routes } from 'react-router-dom'
import NonVeg from './Components/NonVeg'
import Veg from './Components/Veg'
import AddNewRecipie from './Components/AddNewRecipie'
import Home from './Components/Home'

const App = () => {
  return (
    <div>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/nonveg' element={<NonVeg />} />
          <Route path='/veg' element={<Veg />} />
          <Route path='/addnewrecipie' element={<AddNewRecipie />} />
        </Routes>
    </div>
  )
}

export default App
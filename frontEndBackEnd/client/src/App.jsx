import React from 'react'
import NavBar from './Components/NavBar'
import { Route, Routes } from 'react-router-dom'
import NonVeg from './Components/NonVeg'
import Veg from './Components/Veg'


const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/nonveg' element={<NonVeg />} />
        <Route path='/veg' element={<Veg />} />
      </Routes>
    </div>
  )
}

export default App
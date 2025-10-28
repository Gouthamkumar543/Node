import React from 'react'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Data from './components/Data'
import AddNewRecipie from './components/AddNewRecipie'

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='data' element={<Data />} />
        <Route path='/addnewrecipie' element={<AddNewRecipie />} />
      </Routes>
    </div>
  )
}

export default App
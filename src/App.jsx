import './App.css'
import React from 'react'
import Home from './components/homepage/Home'
import LoginForm from './components/loginpage/LoginForm'
import {Routes, Route, Link, NavLink} from 'react-router-dom'

function App() {
  return (
    <>
      
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>


    </>
  )
}

export default App

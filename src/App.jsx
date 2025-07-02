import './App.css'
import React from 'react'
import Home from './components/homepage/Home'
import LoginForm from './components/loginpage/LoginForm'
import {Routes, Route, Link, NavLink} from 'react-router-dom'
import Private from './components/privatepage/Private'

function App() {
  return (
    <>
      
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/privada" element={<Private />} />
    </Routes>


    </>
  )
}

export default App

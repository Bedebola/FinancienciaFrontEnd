import './App.css'
import React from 'react'
import Home from './components/homepage/Home'
import PrivatePage from './components/privatepage/PrivatePage.jsx'
import LoginForm from './components/loginpage/LoginForm'
import {Routes, Route, Link, NavLink} from 'react-router-dom'
import Private from './components/privatepage/Private'

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

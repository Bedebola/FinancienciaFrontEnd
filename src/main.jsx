import React from 'react'
import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './components/loginpage/Login.css'
import './components/homepage/Home.css'
import './components/privatepage/Privete.css'
 
import { BrowserRouter } from 'react-router-dom'
 
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <BrowserRouter>
     <App></App>
   </BrowserRouter>
  </React.StrictMode>,
)
 
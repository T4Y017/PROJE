import { useEffect,useState } from 'react'
import axios from 'axios'
import './App.css'
import {FirmInfoModal } from "./components/firm-info-modal"
import { UserInfoModal } from './components/user-info-modal'
import Home from './pages/Home'
import Firms from './pages/Firms'
import { Outlet } from 'react-router'

function App(){
  

   
    
   
   

    
    
    return (
    <div className='App'>
      <Outlet />
    </div>)
    
}

export default App

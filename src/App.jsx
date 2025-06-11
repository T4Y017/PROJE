import { useState , useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'
import { Table } from './components/Table'

function App(){
  return <div className='App'>
     <Table />
  </div>
}

export default App

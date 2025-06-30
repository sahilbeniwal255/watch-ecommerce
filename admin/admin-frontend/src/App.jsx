import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import {Routes, Route} from 'react-router-dom'
import Add from './pages/Add';
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'
import { useEffect } from 'react'
import {useLocation} from 'react-router-dom'

export const backendUrl = import.meta.env.VITE_BACKEND_URL; 

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
  useEffect(() => {
    localStorage.setItem('token' , token)
  }, [token])

  const location = useLocation();

  return (
    <>
    {token === '' ? <Login setToken = {setToken}/> : 
      <>
        <Navbar setToken = {setToken}/>
        <div className='flex'>
          <Sidebar/>
          <Routes>
            <Route path = '/add' element = {<Add token = {token}/>}/>
            <Route path = '/list' element = {<List token = {token}/>}/>
            <Route path = '/order' element = {<Orders token = {token}/>}/>
          </Routes>
        </div>
      </>
    }
    </>
  )
}

export default App

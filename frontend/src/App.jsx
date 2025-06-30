import { useState } from 'react'
import About from './pages/About.jsx'
import Home from './pages/Home.jsx'
import Collection from './pages/Collection.jsx'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import Contact from './pages/Contact.jsx'
import Cart from './pages/Cart.jsx'
import Product from './pages/Product.jsx'
import Login from './pages/Login.jsx'
import PlaceOrder from './pages/PlaceOrder.jsx'
import Orders from './pages/Orders.jsx'
import Navbar from './components/Navbar.jsx'
import Search from './components/Search.jsx'

function App() {

  return (
    <div>
      <Navbar/>
      <Search/>
      <Routes>
        <Route path = '/' element = {<Home/>}/>
        <Route path = '/login' element = {<Login/>}/>
        <Route path = '/collection' element = {<Collection/>}/>
        <Route path = '/about' element = {<About/>}/>
        <Route path = '/contact' element = {<Contact/>}/>
        <Route path = '/cart' element = {<Cart/>}/>
        <Route path = '/placeorder' element = {<PlaceOrder/>}/>
        <Route path = '/product/:productId' element = {<Product/>}/>
        <Route path = '/orders' element = {<Orders/>}/>
      </Routes>
    </div>
  )
}

export default App

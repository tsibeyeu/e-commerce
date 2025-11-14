import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Collection from './pages/Collection.jsx'
import Orders from './pages/Orders.jsx'
import Product from './pages/Product'
import Cart from './pages/Cart.jsx'
import PlaceOrders from './pages/PlaceOrders.jsx'
import Login from './pages/Login.jsx'
import Navbar from './components/Navbar.jsx'

const App = () => {
  return (
    
    <div className='px-4 sm:px-[5vw] md:px-[7vm] lg:px-[10vw]'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/place-order' element={<PlaceOrders/>} />
        <Route path='/login ' element="<Login/>" />
        <Route path='*' element={<h1 className='text-center mt-20 text-3xl'>404 Not Found</h1>} />
      </Routes>
      
    </div>
  )
}

export default App

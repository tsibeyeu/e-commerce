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
import Footer from './components/Footer.jsx'
import SearchBar from './components/SearchBar.jsx'
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    
    <div className='px-4 sm:px-[5vw] md:px-[7vm] lg:px-[10vw]'>
      <ToastContainer/>
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/place-order' element={<PlaceOrders/>} />
        <Route path='*' element={<h1 className='text-center mt-20 text-3xl'>404 Not Found</h1>} />
      </Routes>
      <Footer />
      
    </div>
  )
}

export default App

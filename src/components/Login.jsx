import React, { useState } from 'react'
import axios from 'axios';
import { backend_url } from '../App.jsx';
import { toast } from 'react-toastify';

const Login = ({setToken}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
    //   const response =await axios.post(`${backend_url}/api/user/admin`,{
    //     email,
    //     password
    // })
    const  response = await axios.post(backend_url + '/api/user/admin', {email,password});
    if(response.data.success){
        setToken(response.data.token);
        toast.success("login successful");

    }else{
      toast.error("login failed");
    }
      
      
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Error during admin login:", error);
      
    }
  }
  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 className='text-2xl  font-bold mb-4'>
          Admin Panel
        </h1>
        <form onSubmit={onSubmitHandler} >
          <div  className='mb-3 min-w-72'>
            <p>Email Address</p>
            <input onChange={(e)=>setEmail(e.target.value)}  value={email} className='rounded-md w-full px-3 py-2 border border-gray-300  outline-none' type="email" placeholder='your@email.com' required />
          </div >
          <div className='mb-3 min-w-72'>
            <p>Password</p>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300  outline-none' type="password" placeholder='Enter your password' required />
          </div>
          <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black' type="submit">Login</button>
        </form>
      </div>
      
    </div>
  )
}

export default Login

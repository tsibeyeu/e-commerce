import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'

const PlaceOrders = () => {
  const [method,setMethod]=useState('cod') ;
  const {Navigate}=useContext(ShopContext);
  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
         {/* order summary Left side */}
        <div className='text-xl sm:text-2xl my-4'>
          <Title title1={'DELIVERY'} title2={'INFO'}/>
        </div>
        <div className='flex gap-3'>
          <input type="text " className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='First name' />
          <input type="text " className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Second name' />

        </div>
          <input type="email " className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Email address' />
          <input type="text " className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Street' />

          <div className='flex gap-3'>
          <input type="text " className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='City' />
          <input type="text " className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='State' />

        </div>

        <div className='flex gap-3'>
          <input type="text " className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Zipcode' />
          <input type="text " className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Country' />

        </div>

          <input type="number " className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Phone number' />


      </div>
      {/* order summary Right side */}
      <div className='mt-8'>
        <div className='min-w-80 mt-8'>
          <CartTotal/>
        </div>

        <div className='mt-12'> 
          <Title title1={'PAYMENT'} title2={'METHOD'}/>
          {/* payment methods */}
          <div className='flex flex-col gap-3 lg:flex-row '>
            <div onClick={()=>setMethod('strip')} className={`flex items-center gap-3 border p-2 px-3 cursor-pointer`}>
              <p  className= {`min-w-3.5 h-3.5 border rounded-full ${method === 'strip' ? 'bg-green-500':''} `}></p>
              <img src={assets.stripe_logo} alt="" className="h-5 mx-4" />
            </div>
            <div onClick={()=>setMethod('cod')} className={`flex items-center gap-3 border p-2 px-3 cursor-pointer`}>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-500':''}`}></p>
              <p className="text-gray-500 text-sm font-medium">CASH ON DELIVERY</p>
            </div>
          </div>
          <div className='w-full text-end mt-8'>
                      <button onClick={()=>Navigate('/orders')} className='cursor-pointer bg-black text-white text-sm py-3 px-16 mt-6 hover:bg-gray-800 duration-300'>PLACE ORDER</button>

          </div>

        </div>
      </div>
      
    </div>
  )
}

export default PlaceOrders

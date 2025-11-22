import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';

const Orders= () => {
  const {products,currency}=useContext(ShopContext);
  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title title1={'MY'} title2={'ORDERS'}/>
      </div>
      <div>
        {
          products.slice(1,4).map((item,index)=>(
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img src={item.image[0]} alt="" className="w-16 sm:w-20" />
              

              <div>
                <p className='font-medium sm:text-base'>{item.name}</p>
                <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                  <p className='text-lg'>{currency}{item.price}</p>
                  <p >Quantity:1</p>
                  <p >Size: M</p>
                  </div>
                  <p className='mt-4'>Date: <span className='text-gray-400'>4,7,2025</span></p>
              </div>
              </div>
            </div>

          ))
        }
      </div>
      
    </div>
  )
}

export default Orders

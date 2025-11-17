import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-16 my-10 mt-40 text-sm'>
            <div>
                <img src={assets.logo} alt="logo" className='mb-5 min-w-32' />
                <p className='w-full md:w-2/3  text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. In, delectus ullam aliquid iste atque corporis odio consequatur accusantium libero modi tenetur similique, vero debitis deleniti amet praesentium quidem quos optio!</p>
            </div>

      
        <div>
            <p className='text-xl font-medium mb-5'>
                COMPANY

            </p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
      
        <div>
            <p className='text-xl font-medium mb-5'>
                GET IN TOUCH

            </p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>251+94_34_56</li>
                <li>habesh@gmail.com</li>
                
            </ul>
        </div>
          </div>
          <div>
            <hr/>
            <p className='text-center text-gray-600 text-sm py-5'>&copy; 2024 Habesh E-commerce. All rights reserved.</p>
          </div>
      
    </div>
  )
}

export default Footer

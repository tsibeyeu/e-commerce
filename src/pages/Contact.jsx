import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title title1={'CONTACT'} title2={'US'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-10 justify-center mb-28 '>
        <img src={assets.contact_img} alt="" className='w-full md:max-w-[480px]' />
        <div className='flex flex-col justify-center  items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>bole addis <br/> bole 340, Addis Abeba,Ethiopia</p>
          <p className='text-gray-500'>Tel:251+94_34_56 <br/> Email:habesh@gmail.com</p>
          <p className='font-semibold text-xl text-gray-600'>Careers at Habcom</p>
          <p className='text-gray-500'> Learn more about our teams and job openings</p>
          <button className='cursor-pointer border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>
      <NewsLetterBox/>
      
    </div>
  )
}

export default Contact

import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400' >
        {/* left side */}
        <div className="w-full pl-20  flex py-10 sm:w-1/2 sm:py-0 items-center judtify-starter">
             <div className='text-[#414141] '>
                <div className='flex items-center gap-2'>
                    <p className='w-8 md:w-11 h-0.5 bg-[#414141]'></p>
                    <p className='font-medium text-sm md:text-base'>OUR BESTSELLER</p>
                </div>
                <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
                <div className='flex items-center gap-2'>
                    <p className="font-semibold text-sm md:text-base">SHOPE NOW</p>
                    <p className='w-8 md:w-11 h-px bg-[#414141]'></p>
                </div>
             </div>

        </div>
        {/* right side */}
        <img className='w-full sm:w-1/2' src={assets.hero_img} alt="" />
      
    </div>
  )
}

export default Hero

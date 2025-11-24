import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title title1={'ABOUT'} title2={'US'}/>
        </div>
        <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img src={assets.about_img} className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600' alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus delectus vitae recusandae? Ab soluta assumenda fugiat quae, ex reprehenderit animi incidunt ad beatae eveniet quis voluptas ut exercitationem voluptates quia!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.</p>

          </div>
        </div>
        <div className='text-4xl py-4'>
          <Title title1={'WHY'} title2={'CHOOSE US'}/>
        </div>
        <div className='flex flex-col md:flex-row text-sm mb-8'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Quality Assurance:</b>
            <p className='text-gray-800'>Lorem ipsum dolor sit amet consectetur adipisicing elit. In earum nobis illo, fugiat dolor maiores esse animi harum corporis asperiores numquam. Dolor est officia esse quis neque laboriosam ipsam beatae!</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Convenience:</b>
            <p className='text-gray-800'>Lorem ipsum dolor sit amet consectetur adipisicing elit. In earum nobis illo, fugiat dolor maiores esse animi harum corporis asperiores numquam. Dolor est officia esse quis neque laboriosam ipsam beatae!</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Execeptional Customer Service:</b>
            <p className='text-gray-800'>Lorem ipsum dolor sit amet consectetur adipisicing elit. In earum nobis illo, fugiat dolor maiores esse animi harum corporis asperiores numquam. Dolor est officia esse quis neque laboriosam ipsam beatae!</p>
          </div>
        </div>
        <NewsLetterBox/>
      
    </div>
  )
}

export default About

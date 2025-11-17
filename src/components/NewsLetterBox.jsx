import React from 'react'

const NewsLetterBox = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
         <p className='text-gray-400 mt-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem enim ab harum magni facilis aliquam consectetur! Reiciendis, consequatur. Aperiam porro quos, maxime praesentium doloremque perspiciatis officiis doloribus nostrum ipsam eius?</p>
         <form onSubmit={handleSubmit} className='w-full sm:w-1/2 mx-auto pl-3 flex items-center my-6 gap-3'>
            <input type="email" className='w-full sm:flex-1 outline-none'  placeholder="Enter your email" required />
            <button type='submit' className='bg-black text-white text-xs px-10 py-4 cursor-pointer'>SUBSCRIBE</button>
         </form>
    </div>
  )
}

export default NewsLetterBox

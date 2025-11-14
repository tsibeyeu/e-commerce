import React from 'react'

const Title = ({title1,title2}) => {
  return (
    <div className='inline-flex items-center gap-2 mb-4'>
        <p className='text-gray-500'>{title1}<span className='text-gray-700 font-medium'>{title2}</span></p>
        <p className='w-8 sm:w-12 h-px sm:h-0.5 bg-gray-700'></p>
      
    </div>
  )
}

export default Title

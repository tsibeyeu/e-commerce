import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({id,image,price,name}) => {

    const {currency}=useContext(ShopContext);
  return (
    <Link className='cursor-pointer text-gray-700' to={`/product/${id}`}>
        <div className="overflow-hidden">
            <img className='transition hover:scale-110  ease-in-out' src={image[0]} alt="product image" />
        </div>
        <p className='text-sm pt-3 pb-1'>{name}</p>
        <p className='text-sm font-medium'>{currency}{price}</p>
      
    </Link>
  )
}

export default ProductItem

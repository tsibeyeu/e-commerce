import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const {products}=useContext(ShopContext);
    const [Bestseller,SetbestSeller]=useState([]);

    useEffect(()=>{
        const bestsellers = products.filter(product => product.bestseller);
        SetbestSeller(bestsellers);
    },[products])
  return (
    <div className='my-10 '>
        <div className='py-4 text-center text-3xl'>
            <Title title1={"BEST"} title2={"SELLERS"}/>
            <p className='w-3/4 m-auto text-gray-600 text-xl sm:text-sm md:text-base'> "Explore our top-selling products, loved by customers for their quality and style. Find your new favorite today!"
            </p>
        </div>
        {/* BestSeller Products Grid */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                Bestseller.map((products,index)=>(
                    
                    <ProductItem  key={index} image={products.image} price={products.price} id={products._id} name={products.name}/>
                ))
            }
      </div>
            
      
    </div>
  )
}

export default BestSeller

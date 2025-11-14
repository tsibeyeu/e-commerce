import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title.jsx'
import ProductItem from './ProductItem.jsx';

const LatestCollection = () => {
    const {products}=useContext(ShopContext);
    const [LatestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        const latest = products.slice(0,10); // Get the first 10 products as the latest collection
        setLatestProducts(latest);
    }, [products]);
  return (
    <div className='my-10 '>
        <div className='py-4 text-center text-3xl'>
            <Title title1={"LATEST"} title2={"COLLECTIONS"}/>
            <p className='w-3/4 m-auto text-gray-600 text-xl sm:text-sm md:text-base'> "Discover the latest trends in our newest collection, featuring fresh styles and must-have pieces to elevate your wardrobe
            </p>
        </div>
        {/* Products Grid */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6'>
            {
                LatestProducts.map((products,index)=>(
                    <ProductItem  key={index} image={products.image} price={products.price} id={products._id} name={products.name}/>
                ))
            }
      </div>

    </div>
  )
}

export default LatestCollection

// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import Title from './Title';
// import ProductItem from './ProductItem';

// const BestSeller = () => {
//     const {products}=useContext(ShopContext);
    
//     const [bestSeller,setBestSeller]=useState([]);
//     console.log('products',products);
//     console.log('bestSeller',bestSeller);

//     useEffect(()=>{
//         const bestsellers = products.filter((product) => (product.bestSeller));
//         setBestSeller(bestsellers.slice(0,5));
//     },[products])

// ...existing code...
import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const {products}=useContext(ShopContext);
    
    const [bestSeller,setBestSeller]=useState([]);
    console.log('products',products);
    console.log('bestSeller',bestSeller);

    useEffect(()=>{
        if (!Array.isArray(products) || products.length === 0) {
            setBestSeller([]);
            return;
        }

        console.log('best flags:', products.map(p => p?.bestSeller));

        const bestsellers = products.filter(product => {
            const v = product?.bestSeller;
            // accept boolean true, string "true", numeric 1/"1", or form values like "on"
            return v === true || v === 'true' || v === 1 || v === '1' || v === 'on';
        });

        setBestSeller(bestsellers.slice(0,5));
    },[products])
// ...existing code...
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
                bestSeller.map((products,index)=>(
                    
                    <ProductItem  key={index} image={products.image} price={products.price} id={products._id} name={products.name}/>
                ))
            }
      </div>
            
      
    </div>
  )
}

export default BestSeller

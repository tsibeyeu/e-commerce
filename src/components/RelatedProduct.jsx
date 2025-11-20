import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const RelatedProduct = ({category,subCategory}) => {
    const {products}=useContext(ShopContext);
    const [relatedProducts,setRelatedProducts]=useState([]);

    useEffect(()=>{
        if(products.length > 0) {
            let productCopy=products.slice();

            productCopy=products.filter((item)=>category === item.category);
            productCopy=productCopy.filter((item)=>subCategory === item.subCategory);
            setRelatedProducts(productCopy.slice(0,5));
            
        }

    },[products])
  return (
    <div className='mt-24'>
        <div className="py-2 text-3xl text-center">
            <Title title1={'RELATED'} title2={'PRODUCT'}/>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {relatedProducts.map((item,index)=>(
                <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image}/>
            ))}

        </div>
      
    </div>
  )
}

export default RelatedProduct

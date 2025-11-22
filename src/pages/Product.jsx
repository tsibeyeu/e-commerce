import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProduct from '../components/RelatedProduct';

const Product = () => {
  const {productId} = useParams();
  const {products,currency,addToCart}=useContext(ShopContext);
  const [productData,setProductData]=useState(false);
  const[image,setImage]=useState('');
  const [size,setSize]=useState('');

  const fetchProductData=async()=>{
    products.map((item)=>{
      if(item._id===productId){
        setProductData(item);
       
        setImage(item.image[0]);
        return null
      }
    })
  }

  useEffect(()=>{
    fetchProductData();

  },[productId,products])
 
  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity duration-500 ease-in opacity-100'>
      {/*product Data */}
      <div className='flex flex-col gap-12 sm:gap-12 sm:flex-row'>
        {/* images section */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex  sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item,index)=>(
                <img onClick={()=>setImage(item)} src={item} alt="image of product" key={index} className='w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer' />
              ))
            }

          </div>
          <div className='w-full sm:w-[80%] '>
            <img className='w-full h-auto' src={image} alt="" />

          </div>

        </div>

        {/* product details section */}

        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">
            {productData.name}
          </h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md-4/5'>{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item,index)=>(
                <button onClick={()=>setSize(item)} key={index} className={`border py-2 px-4 bg-gray-100 ${item=== size ?'border-orange-600':''}`}>
                  {item}
                  </button>))}
            </div>
          </div>
          <button onClick={()=>addToCart(productData._id,size)} className='border text-white bg-black px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr  className='mt-8 sm:w-4/5'/>
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product.</p>
            <p>Cash on delivery is avaialble on this product</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>

      </div>
      {/*.............................DESCRIPTION AND REVIEW SECTION */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Review(122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>an ecommerce website is an online platform that facilitates the buying and sellin Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi eligendi, inventore magni neque modi, facilis repellat illum alias aspernatur qui, dolor voluptatum reiciendis a praesentium quia ea placeat magnam enim.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi sit, iusto sequi doloribus et qui commodi tempore! Maxime, beatae et quo vitae delectus dolorum minima velit voluptates nesciunt provident asperiores!</p>
        </div>
      </div>

      {/* Related Products Section */}
      <RelatedProduct category={productData.category} subCategory={productData.subCategory}/>
      
    </div>
  ): <div className='opacity-0'></div>
}

export default Product

import React, { use, useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {
  const {products,search,showSearch}=useContext(ShopContext);
  const [showFilter,setShowFilter]=useState(false);
  const [filterProduct,setFilterProduct] =useState([]);
  const [category,setCategory]=useState([]);
  const [subCategory,setSubCategory]=useState([]);
  const [sortType,setSortType]=useState('relavent');

  const toggleSubCategory=(e)=>{
    const value=e.target.value;
    if(subCategory.includes(value)){
      setSubCategory(prev=>prev.filter(item=>item!==value))
    }
    else{
      setSubCategory(prev=>[...prev,value])
    }
  }

  const toggleCategory=(e)=>{
    const value=e.target.value;
    if(category.includes(value)){
      setCategory(prev=>prev.filter(item=>item!==value))
    }
    else{
      setCategory(prev=>[...prev,value])
    }
  }

  const applyFilters=()=>{
    let productCopy=products.slice();
    if (showSearch && search) {
      productCopy=productCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()));
      
    }
    if(category.length>0){
      productCopy=productCopy.filter(item=>category.includes(item.category));
    }
    if(subCategory.length>0){
      productCopy=productCopy.filter(item=>subCategory.includes(item.subCategory));
    }

    setFilterProduct(productCopy);
  }

  const sortProduct=()=>{
    let filterProductCopy=filterProduct.slice();

    switch(sortType){
      case 'low-high':
        setFilterProduct(filterProductCopy.sort((a,b)=>a.price-b.price));
        break;
      case 'high-low':
        setFilterProduct(filterProductCopy.sort((a,b)=>b.price-a.price));
        break;
      default:
        applyFilters();
        break;
    }
  }

  useEffect(()=>{
    setFilterProduct(products);


  },[])

  useEffect(()=>{
    applyFilters();

  },[category,subCategory,search,showSearch,products])

  useEffect(()=>{
    sortProduct();
  },[sortType])
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t' >
      {/* Filter Options*/ }
      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS

        <img src={assets.dropdown_icon} alt=""  className={`h-3 sm:hidden ${showFilter ?'rotate-90':''}`}/>
        </p>
    
      {/* Category Filter */}
      <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '':'hidden'} sm:block`}>
        <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
        <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
          <p className=' felx gap-2'>
            <input onChange={toggleCategory} type="checkbox" className='w-3 ' value={'Men'} /> Men
          </p>
          <p className=' felx gap-2'>
            <input onChange={toggleCategory} type="checkbox" className='w-3 ' value={'Women'} /> Women
          </p>
          <p className=' felx gap-2'>
            <input onChange={toggleCategory} type="checkbox" className='w-3 ' value={'Kids'} /> Kids
          </p>
        </div>
      </div>
      {/* SUBCATEGORY Filter */}
      <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '':'hidden'} sm:block`}>
        <p className='mb-3 text-sm font-medium'>TYPES</p>
        <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
          <p className=' felx gap-2'>
            <input onChange={toggleSubCategory} type="checkbox" className='w-3 ' value={'Topwear'} /> Topwear
          </p>
          <p className=' felx gap-2'>
            <input onChange={toggleSubCategory}  type="checkbox" className='w-3 ' value={'Bottomwear'} /> Bottomwear
          </p>
          <p className=' felx gap-2'>
            <input onChange={toggleSubCategory}  type="checkbox" className='w-3 ' value={'Winterwear'} /> Winterwear
          </p>
        </div>
      </div>
        </div>
        {/*Right side */}
        <div className='flex-1'>
          <div className='flex justify-between text-base sm:text-2xl mb-4'>
            <Title title1={'ALL'} title2={'COLLECTIONS'}/>
            {/*product sort */}
            <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2 '>
              <option value="relavent">Sort by: Relavent</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>

          {/*Map products */}
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
            {
              filterProduct.map((itme,index)=>(
                <ProductItem key={index} name={itme.name} id={itme._id} price={itme.price} image={itme.image}/>
              ))
            }
          </div>
        </div>
      
    </div>
  )
}

export default Collection

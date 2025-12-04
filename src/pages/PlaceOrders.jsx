import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrders = () => {
  const {Navigate,backendURLtoken,cartItems,setCartItems,getCartAmount,deliveryFee,products}=useContext(ShopContext);

  const [method,setMethod]=useState('cod') ;
  const [formData,setFormData]=useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  })
  const onChangeHandler =(e)=>{
    const name =e.target.name
    const value=e.target.value

    setFormData(data =>({...data,[name]:value}))

  }
  const onSubmitHandler =async (e) =>{
    e.preventDefault()
    try {
      let orderItems=[]
      for(const items in cartItems){
        for(const item in cartItems(items)){
          if (cartItems[items][item]>0) {
            const itemInfo=structuredClone(products.find(product =>product._id ===items))
            if (itemInfo) {
              itemInfo.size =item
              itemInfo.quantity =cartItems[items][item]
              orderItems.push(itemInfo)
              
            }
            
          }
        }
      }
      console.log(orderItems);
      let orderData={
        address:formData,
        items:orderItems,
        amount:getCartAmount() + deliveryFee
      }

      switch (method) {
        case 'cod':
          const response =await axios.post(backendUrl + '/api/order/place',orderData,{headers:{token}})
          if (response.data.success) {
            setCartItems({})
            Navigate('/order')
          }else{
            toast.error(response.data.message)

          }
          break;
      
        default:
          break;
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      
    }
  }
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
         {/* order summary Left side */}
        <div className='text-xl sm:text-2xl my-4'>
          <Title title1={'DELIVERY'} title2={'INFO'}/>
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text " className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='First name' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} type="text " className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Second name' />

        </div>
          <input required onChange={onChangeHandler} name='email' value={formData.email} type="email " className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Email address' />
          <input required onChange={onChangeHandler} name='street' value={formData.street} type="text " className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Street' />

          <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} type="text " className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='City' />
          <input required onChange={onChangeHandler} name='state' value={formData.state} type="text " className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='State' />

        </div>

        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} type="text " className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Zipcode' />
          <input required onChange={onChangeHandler} name='country' value={formData.country} type="text " className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Country' />

        </div>

          <input required onChange={onChangeHandler} name='phone' value={formData.phone} type="number " className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Phone number' />


      </div>
      {/* order summary Right side */}
      <div className='mt-8'>
        <div className='min-w-80 mt-8'>
          <CartTotal/>
        </div>

        <div className='mt-12'> 
          <Title title1={'PAYMENT'} title2={'METHOD'}/>
          {/* payment methods */}
          <div className='flex flex-col gap-3 lg:flex-row '>
            <div onClick={()=>setMethod('strip')} className={`flex items-center gap-3 border p-2 px-3 cursor-pointer`}>
              <p  className= {`min-w-3.5 h-3.5 border rounded-full ${method === 'strip' ? 'bg-green-500':''} `}></p>
              <img src={assets.stripe_logo} alt="" className="h-5 mx-4" />
            </div>
            <div onClick={()=>setMethod('cod')} className={`flex items-center gap-3 border p-2 px-3 cursor-pointer`}>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-500':''}`}></p>
              <p className="text-gray-500 text-sm font-medium">CASH ON DELIVERY</p>
            </div>
          </div>
          <div className='w-full text-end mt-8'>
                      <button type='submit'  className='cursor-pointer bg-black text-white text-sm py-3 px-16 mt-6 hover:bg-gray-800 duration-300'>PLACE ORDER</button>

          </div>

        </div>
      </div>
      
    </form>
  )
}

export default PlaceOrders

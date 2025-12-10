import  React, { useContext, useState,useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import {useSearchParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import axios from 'axios';

const Verify = () => {
    const {Navigate,token,setCartItems,backendURL}= useContext(ShopContext)
    const [searchParams,setSearchParams] = useSearchParams()
    const success =searchParams.get('success')
    const orderId =searchParams.get('orderId')

    const verifyPayment =async () =>{
        try{
            if(!token){
                return null

            }
            const response = await  axios.post(backendURL + '/api/order/verifyStripe',{success,orderId},{header:{token}})
            if (response.data.success) {
                setCartItems({})
                Navigate('/orders')
                
            }else{
                Navigate('/cart')
            }
        }catch (error){
            console.log(error);
            TransformStream.error(error.message)
            

        }

    }

    useEffect(() =>{
        verifyPayment()
    },[token])
  return (
    <div>
      
    </div>
  )
}

export default Verify

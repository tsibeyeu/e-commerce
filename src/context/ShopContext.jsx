import React,{ createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios"

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const deliveryFee = 10;
    const currency = "$";
    const backendURL=import.meta.env.VITE_BACKEND_URL
    const [search,setSearch]=useState("");
    const [showSearch,setShowSearch]=useState(false);
    const [cartItems,setCartItems]=useState({});
    const [products,setProducts]=useState([])
    const [token,setToken] =useState("")
    const Navigate=useNavigate();

    const addToCart= async (itemId,size)=>{
        if(!size){
           toast.error("Please select a size");
            return;
        }
        let cartData= structuredClone(cartItems);

        if (cartData[itemId]){
            
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }

            else{
                cartData[itemId][size] = 1;
            }

            
        }
        else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
        if(token){
            try {
                await axios.post(backendURL + "/api/cart/add",{itemId,size},{headers:{token}})
            } catch (error) {
                console.log(error);
                toast.error(error.message)
                
                
            }
        }

    }

   const getCartCount=()=>{
    let totalCount=0;
    for(const items in cartItems){
        for(const item in cartItems[items]){
            try {
                
               if (cartItems[items][item]>0){
                totalCount+=cartItems[items][item];
                
               }
            } catch (error) {
                
            }
        }
    }
    return totalCount;
   }

   const getCartAmount= ()=>{
    let totalAmount=0;
    for(const items in cartItems){
        let itemInfo=products.find((product)=>product._id===items);
        for(const item in cartItems[items]){
            try {
                if (cartItems[items][item]>0){
                    totalAmount+= itemInfo.price * cartItems[items][item];
                    
                }
                
            } catch (error) {
                
            }
        }

   }
    return totalAmount;
}

   const updateQuantity= async (itemId,size,quantity)=>{
    console.log("itemId",itemId,"size",size,"quantity",quantity);
    let cartData = structuredClone(cartItems);

    cartData[itemId][size]=quantity;
    console.log("cartData",cartData);

    setCartItems(cartData);
    if(token){
            try {
                await axios.post(backendURL + "/api/cart/update",{itemId,size,quantity},{headers:{token}})
            } catch (error) {
                console.log(error);
                toast.error(error.message)
                
                
            }
        }

   }

   const getProductsData=async () => {
    try { 
        const response=await axios.get(backendURL + "/api/product/list")
        console.log(response);
        
        if (response.data.success) {
            setProducts(response.data.products)
            
        }else{
            toast.error(response.data.message)
        }
        
    } catch (error) {
        console.log(error);
        toast.error(error.message)
        
        
    }
   }

   const getUserCart =async (token) => {
    try {
        const response=await axios.post(backendURL + "/api/cart/get",{},{headers:{token}})
        if (response.data.success) {
            setCartItems(response.data.cartData)
            
        }
    } catch (error) {
        console.log(error);
        toast.error(error.message)
        
        
    }
    
   }

   useEffect(()=>{
    getProductsData()

   },[])

useEffect(()=>{
    if(!token && localStorage.getItem("token")){
        setToken(localStorage.getItem("token"))
        getUserCart(localStorage.getItem("token"))
    }
},[])

    const value = { products: products, deliveryFee: deliveryFee, currency: currency , search:search, setSearch:setSearch, showSearch:showSearch, setShowSearch:setShowSearch, cartItems:cartItems,setCartItems, addToCart:addToCart,getCartCount:getCartCount,
         updateQuantity:updateQuantity, getCartAmount:getCartAmount,Navigate,backendURL,token,setToken};
   
    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;
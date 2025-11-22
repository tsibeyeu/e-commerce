import React,{ createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const deliveryFee = 10;
    const currency = "$";
    const [search,setSearch]=useState("");
    const [showSearch,setShowSearch]=useState(false);
    const [cartItems,setCartItems]=useState({});

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

   const updateQuantity= async (itemId,size,quantity)=>{
    console.log("itemId",itemId,"size",size,"quantity",quantity);
    let cartData = structuredClone(cartItems);

    cartData[itemId][size]=quantity;
    console.log("cartData",cartData);

    setCartItems(cartData);

   }



    const value = { products: products, deliveryFee: deliveryFee, currency: currency , search:search, setSearch:setSearch, showSearch:showSearch, setShowSearch:setShowSearch, cartItems:cartItems, addToCart:addToCart,getCartCount:getCartCount, updateQuantity:updateQuantity};
   
    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;
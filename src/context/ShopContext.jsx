import React,{ createContext, useState } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const deliveryFee = 10;
    const currency = "$";
    const [search,setSearch]=useState("");
    const [showSearch,setShowSearch]=useState(false);
    const value = { products: products, deliveryFee: deliveryFee, currency: currency , search:search, setSearch:setSearch, showSearch:showSearch, setShowSearch:setShowSearch};
   
    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;
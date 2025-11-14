import React,{ createContext } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const deliveryFee = 10;
    const currency = "$";
    const value = { products: products, deliveryFee: deliveryFee, currency: currency };
   
    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;
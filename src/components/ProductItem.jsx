import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProductItem = ({ id, image, price, name }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link className="group block relative" to={`/product/${id}`}>
      {/* Image Container with Elegant Shadow */}
      <div className="relative w-full aspect-[3/4] overflow-hidden rounded-[2rem] bg-[#f8f8f8] mb-6 shadow-sm transition-all duration-700 group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] group-hover:-translate-y-2">
        <img
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
          src={image[0]}
          alt={name}
        />

        {/* Flag-inspired detail strip (Thin Gold line at top) */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#009b44] via-[#ffcd00] to-[#ee2737] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Quick View Icon Overlay */}
        <div className="absolute inset-0 bg-[#33211D]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <span className="bg-white text-black text-[9px] font-black uppercase tracking-widest px-6 py-3 rounded-full shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            Discover Piece
          </span>
        </div>
      </div>

      {/* Info Section - Editorial Style */}
      <div className="text-center">
        <p className="text-[9px] text-[#DA9F5B] font-black uppercase tracking-[0.3em] mb-2">
          Ethio-Heritage
        </p>
        <h3 className="text-sm font-black text-[#33211D] uppercase tracking-tighter leading-none mb-2 group-hover:text-[#ffcd00] transition-colors">
          {name}
        </h3>
        <p className="text-sm font-black text-gray-400">
          <span className="text-[10px] mr-1 opacity-50">{currency}</span>
          {parseFloat(price).toLocaleString()}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;

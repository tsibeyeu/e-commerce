import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, price, name }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      className="bg-white group block rounded-2xl p-3 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
      to={`/product/${id}`}
    >
      {/* 1. Fixed Aspect Ratio Image Container */}
      <div className="relative w-full aspect-[4/5] overflow-hidden rounded-xl bg-slate-50">
        <img
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          src={image[0]}
          alt={name}
        />

        {/* Subtle Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
      </div>

      {/* 2. Product Information Section */}
      <div className="mt-4 px-1">
        <p className="text-[10px] text-[#009b44] font-bold uppercase tracking-widest mb-1">
          Authentic
        </p>
        <p className="text-sm font-semibold text-slate-800 truncate leading-tight">
          {name}
        </p>
        <div className="flex justify-between items-center mt-3">
          <p className="text-base font-bold text-slate-900">
            {currency}
            {price}
          </p>
          <button className="text-[10px] bg-slate-900 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;

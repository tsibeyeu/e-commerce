import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem.jsx";
import { motion } from "framer-motion";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      setLatestProducts(products.slice(0, 10));
    }
  }, [products]);

  if (!products || products.length === 0) {
    return (
      <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-2 border-[#ffcd00] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[10px] font-black uppercase tracking-[.4em] text-slate-400">
          Weaving History...
        </p>
      </div>
    );
  }

  return (
    <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-32 px-6 md:px-16 bg-white overflow-hidden">
      {/* Decorative Text in background */}
      <div className="absolute top-20 right-0 text-[18vw] font-black text-gray-50 leading-none pointer-events-none select-none uppercase tracking-tighter opacity-50">
        New Arrival
      </div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[2px] w-8 bg-[#009b44]"></div>
              <p className="text-[#ee2737] font-black uppercase text-[10px] tracking-[0.4em]">
                2026 Collection
              </p>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-[#33211D] uppercase tracking-tighter leading-none">
              THE LATEST <br />
              <span className="text-[#ffcd00]">CURATION.</span>
            </h2>
          </div>

          <p className="text-gray-400 text-xs md:text-sm font-medium max-w-xs leading-relaxed border-l-2 border-gray-100 pl-6">
            Explore hand-woven masterpieces where traditional Tibeb artistry
            meets contemporary Ethiopian silhouettes.
          </p>
        </div>

        {/* Grid with Asymmetric Spacing feel */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-16">
          {latestProducts.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={item._id || index}
            >
              <ProductItem
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            </motion.div>
          ))}
        </div>

        {/* Pro CTA Link */}
        <div className="mt-24 text-center">
          <button className="group flex flex-col items-center mx-auto">
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-gray-400 group-hover:text-[#ffcd00] transition-colors mb-4">
              Discover Full Catalog
            </span>
            <div className="w-12 h-[1px] bg-gray-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-[#ffcd00] -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default LatestCollection;

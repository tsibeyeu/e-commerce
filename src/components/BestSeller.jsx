import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import { motion } from "framer-motion";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      const bestsellers = products.filter((product) => {
        const v = product?.bestSeller;
        return v === true || v === "true" || v === 1 || v === "1" || v === "on";
      });
      setBestSeller(bestsellers.slice(0, 5));
    }
  }, [products]);

  if (bestSeller.length === 0) return null;

  return (
    <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-32 px-6 md:px-16 bg-[#FBF9F4] overflow-hidden">
      {/* Background Text Overlay */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[20vw] font-black text-black/[0.02] leading-none pointer-events-none select-none uppercase tracking-tighter">
        Iconic
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center items-center gap-4 mb-6">
              <span className="w-10 h-[1px] bg-[#DA9F5B]"></span>
              <p className="text-[#DA9F5B] font-black uppercase text-[10px] tracking-[0.5em]">
                Most Coveted Pieces
              </p>
              <span className="w-10 h-[1px] bg-[#DA9F5B]"></span>
            </div>

            <h2 className="text-5xl md:text-8xl font-black text-[#33211D] uppercase tracking-tighter leading-none mb-8">
              THE BEST <br />
              <span className="italic font-serif normal-case opacity-80 text-[#33211D]">
                Sellers.
              </span>
            </h2>

            <p className="max-w-xl mx-auto text-gray-500 font-medium text-xs md:text-sm leading-relaxed uppercase tracking-widest opacity-70">
              A curated selection of our most celebrated hand-woven designs.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-10 gap-y-20">
          {bestSeller.map((item, index) => (
            <motion.div
              key={item._id || index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProductItem
                image={item.image} // FIX: Pick the first image from array
                price={item.price}
                id={item._id}
                name={item.name}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSeller;

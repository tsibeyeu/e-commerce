import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
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
    /* This section now breaks out of the parent container to take the full browser width */
    <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-24 px-6 md:px-16 bg-[#fdfcf7] border-y border-slate-100">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Title title1={"BEST"} title2={"SELLERS"} />

          <p className="max-w-2xl mx-auto mt-6 text-slate-500 font-light text-base leading-relaxed px-4">
            "Our most cherished designs, celebrated for their
            <span className="text-slate-900 font-medium">
              {" "}
              authentic artistry
            </span>
            ."
          </p>
        </motion.div>
      </div>

      {/* Grid container handles its own internal width within the full-width section */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
        {bestSeller.map((item, index) => (
          <motion.div
            key={item._id || index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <ProductItem
              image={item.image}
              price={item.price}
              id={item._id}
              name={item.name}
            />
          </motion.div>
        ))}
      </div>

      {/* Professional bottom accent */}
      <div className="mt-20 flex justify-center items-center gap-3 opacity-30">
        <div className="h-[1px] w-12 bg-[#009b44]"></div>
        <div className="h-[1px] w-12 bg-[#ffcd00]"></div>
        <div className="h-[1px] w-12 bg-[#ee2737]"></div>
      </div>
    </section>
  );
};

export default BestSeller;

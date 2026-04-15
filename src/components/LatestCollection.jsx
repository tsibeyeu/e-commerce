import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem.jsx";
import Title from "./Title.jsx";

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
      <div className="min-h-[40vh] flex items-center justify-center text-slate-400 animate-pulse">
        Collecting heritage pieces...
      </div>
    );
  }

  return (
    <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-24 px-6 md:px-16 bg-[#fafafa]">
      <div className="text-center mb-20">
        {/* Using the improved Title component */}
        <Title title1={"LATEST"} title2={"COLLECTIONS"} />

        {/* Redesigned Description Text */}
        <p className="mt-4 text-slate-500 text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed tracking-wide">
          "Where ancient craftsmanship meets modern elegance. Explore our
          curated selection of{" "}
          <span className="text-slate-900 font-medium italic">
            traditional Ethiopian attire
          </span>
          , reimagined for today."
        </p>
      </div>

      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
        {latestProducts.map((item, index) => (
          <ProductItem
            key={item._id || index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>

      {/* Added a professional footer link for the section */}
      <div className="text-center mt-20">
        <p className="text-[10px] uppercase tracking-[.5em] text-slate-400 cursor-pointer hover:text-[#ffcd00] transition-colors">
          View All Products —
        </p>
      </div>
    </section>
  );
};

export default LatestCollection;

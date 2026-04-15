import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[80vh] overflow-hidden group cursor-pointer">
      {/* Background Image with Zoom Effect */}
      <div
        className="absolute inset-0 transition-transform duration-1000 ease-out scale-100 group-hover:scale-110"
        style={{
          backgroundImage: `url(${assets.hero_img})`,
          backgroundSize: "cover",
          backgroundPosition: "center 20%",
        }}
      ></div>

      {/* Elegant Overlay (Appears on Hover) */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-all duration-500 z-10"></div>

      {/* Hover-Only Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="opacity-0 group-hover:opacity-100 transform translate-y-10 group-hover:translate-y-0 transition-all duration-700 ease-out">
          {/* Ethiopian Inspired Accent Line */}
          <div className="flex justify-center items-center gap-4 mb-6">
            <span className="w-12 h-[2px] bg-[#009b44]"></span>{" "}
            {/* Ethio Green */}
            <p className="text-[#ee2737] font-bold tracking-[.3em] uppercase text-sm">
              {" "}
              {/* Ethio Red */}
              Heritage & Soul
            </p>
            <span className="w-12 h-[2px] bg-[#ffcd00]"></span>{" "}
            {/* Ethio Gold */}
          </div>

          <h1 className="prata-regular text-6xl md:text-8xl text-white mb-8 drop-shadow-2xl">
            Ethio-Chic <br />
            <span className="text-[#ffcd00] italic">Tradition</span>
          </h1>

          <button className="px-10 py-4 border-2 border-white text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300">
            View Collection
          </button>
        </div>
      </div>

      {/* Static Label (Optional - shows even before hover so users know to interact) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 group-hover:opacity-0 transition-opacity">
        <p className="text-white text-xs tracking-[0.5em] uppercase font-light animate-bounce">
          Hover to Explore
        </p>
      </div>
    </section>
  );
};

export default Hero;

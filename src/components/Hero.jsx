import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[90vh] overflow-hidden bg-[#f4f1ea] group">
      {/* Background Image with Ken Burns Effect */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${assets.hero_img})`,
          backgroundSize: "cover",
          backgroundPosition: "center 15%",
        }}
      >
        {/* Soft Premium Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent"></div>
      </motion.div>

      <div className="relative z-10 h-full container mx-auto px-6 md:px-16 flex flex-col justify-center items-start">
        {/* Culture Accent Line */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="h-[2px] w-12 bg-[#ffcd00]"></div>
          <p className="text-[#ffcd00] font-black uppercase text-[10px] tracking-[0.5em]">
            Authentic Artisanal Kemis
          </p>
        </motion.div>

        {/* Massive Editorial Typography */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white text-6xl md:text-9xl font-black leading-[0.85] tracking-tighter uppercase"
          >
            HERITAGE <br />
          </motion.h1>
        </div>

        <div className="overflow-hidden mb-10">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white text-6xl md:text-9xl font-black leading-[0.85] tracking-tighter uppercase"
          >
            IN{" "}
            <span className="italic font-serif text-[#DA9F5B] normal-case opacity-90">
              Vogue.
            </span>
          </motion.h1>
        </div>

        {/* Description and CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col md:flex-row items-start md:items-center gap-10"
        >
          <button className="group relative overflow-hidden bg-[#ffcd00] text-black px-12 py-5 font-black uppercase text-[11px] tracking-widest shadow-2xl transition-all active:scale-95">
            <span className="relative z-10">Shop Latest Collection</span>
            <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>

          <div className="max-w-xs border-l border-white/20 pl-6">
            <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
              Experience the soul of Ethiopia <br />
              through hand-spun threads and <br />
              timeless Tibeb patterns.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Modern Scroll Indicator */}
      <div className="absolute left-16 bottom-10 hidden md:flex items-center gap-4">
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-[#ffcd00]"
          />
        </div>
        <p className="text-white/30 text-[9px] font-black uppercase tracking-[0.3em] rotate-180 [writing-mode:vertical-lr]">
          Scroll to explore
        </p>
      </div>

      {/* Side Brand Tag */}
      <div className="absolute right-12 bottom-12 hidden lg:block">
        <p className="text-white/10 text-[120px] font-black leading-none uppercase select-none pointer-events-none tracking-tighter">
          2026
        </p>
      </div>
    </section>
  );
};

export default Hero;

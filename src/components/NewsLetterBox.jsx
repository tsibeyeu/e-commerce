import React from "react";
import { motion } from "framer-motion";

const NewsLetterBox = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    /* 1. Full-Width Breakout with a deep Charcoal/Black background */
    <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-24 bg-[#111827] overflow-hidden">
      {/* 2. Background Decor: Subtle Red and Green glows for Ethiopian identity */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#009b44]/10 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#ee2737]/10 blur-[100px] rounded-full"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Header Typography */}
          <h2 className="text-3xl md:text-5xl prata-regular text-white mb-4">
            Join the <span className="text-[#ffcd00]">Circle</span>
          </h2>

          <p className="text-gray-400 mt-4 text-sm md:text-base font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
            Subscribe to receive exclusive early access to our{" "}
            <span className="text-white font-medium">Limited Edition</span>{" "}
            cultural drops and get 20% off your first handcrafted piece.
          </p>

          {/* 3. Modern Form Design */}
          <form
            onSubmit={handleSubmit}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-0 w-full max-w-lg mx-auto overflow-hidden rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
          >
            <input
              type="email"
              className="w-full px-8 py-5 outline-none bg-transparent text-white placeholder:text-gray-500 text-sm"
              placeholder="Enter your email address"
              required
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#ffcd00] text-black font-bold text-xs px-10 py-5 hover:bg-white transition-all duration-300 tracking-[0.2em]"
            >
              SUBSCRIBE
            </button>
          </form>

          {/* Subtle Privacy Note */}
          <p className="mt-6 text-[10px] text-gray-500 uppercase tracking-widest">
            No spam. Just heritage. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsLetterBox;

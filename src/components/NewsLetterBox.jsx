import React from "react";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";

const NewsLetterBox = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-32 bg-[#F9F9F7] overflow-hidden border-y border-gray-100">
      {/* Background Decorative Pattern (Subtle Weave) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://transparenttextures.com')]"></div>

      {/* Cultural Accent Glows - Very faint to stay "Clean" */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#009b44]/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#ee2737]/5 blur-[120px] rounded-full"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {/* Header Typography */}
          <span className="text-[#DA9F5B] text-[10px] font-black uppercase tracking-[0.5em] mb-6 block">
            Limited Edition Updates
          </span>

          <h2 className="text-5xl md:text-7xl font-black text-[#33211D] mb-6 uppercase tracking-tighter leading-none">
            THE HERITAGE <br />
            <span className="italic font-serif text-[#DA9F5B] normal-case opacity-90">
              Circle.
            </span>
          </h2>

          <p className="text-gray-400 mt-8 text-xs md:text-sm font-medium tracking-[0.2em] max-w-xl mx-auto leading-relaxed uppercase opacity-80">
            Be the first to secure our{" "}
            <span className="text-[#33211D] font-bold">
              hand-woven arrivals
            </span>
            and receive{" "}
            <span className="text-[#DA9F5B] font-bold">member-only</span>{" "}
            bespoke offers.
          </p>

          {/* Form Design: Minimalist & Clean */}
          <form
            onSubmit={handleSubmit}
            className="mt-16 group flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-lg mx-auto"
          >
            <div className="relative w-full">
              <input
                type="email"
                className="w-full px-0 py-5 bg-transparent border-b-2 border-gray-200 text-[#33211D] outline-none focus:border-[#DA9F5B] transition-all duration-500 font-bold text-lg placeholder:text-gray-300"
                placeholder="YOUR EMAIL"
                required
              />
              {/* Gold focus line */}
              <div className="absolute bottom-0 left-0 h-[2px] bg-[#DA9F5B] w-0 group-focus-within:w-full transition-all duration-700"></div>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto mt-4 sm:mt-0 bg-[#33211D] text-white font-black text-[10px] px-12 py-5 rounded-full hover:bg-[#DA9F5B] hover:text-[#33211D] transition-all duration-500 tracking-[0.3em] flex items-center justify-center gap-3 active:scale-95 shadow-xl"
            >
              JOIN US <FaPaperPlane size={10} className="mb-1" />
            </button>
          </form>

          {/* Benefit Badges in Clean Style */}
          <div className="mt-24 flex justify-center items-center gap-16 border-t border-gray-100 pt-12">
            <div className="text-center">
              <p className="text-[#33211D] font-black text-sm uppercase mb-1 tracking-tighter">
                20% Welcome
              </p>
              <p className="text-gray-400 text-[8px] font-bold uppercase tracking-widest">
                On your first piece
              </p>
            </div>
            <div className="h-10 w-[1px] bg-gray-100"></div>
            <div className="text-center">
              <p className="text-[#33211D] font-black text-sm uppercase mb-1 tracking-tighter">
                VIP Access
              </p>
              <p className="text-gray-400 text-[8px] font-bold uppercase tracking-widest">
                Seasonal drops
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsLetterBox;

import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const OurPolicy = () => {
  const policies = [
    {
      icon: assets.exchange_icon,
      title: "Easy Exchange",
      desc: "Hassle-free exchange for your perfect fit",
      color: "bg-[#009b44]/5",
    },
    {
      icon: assets.quality_icon,
      title: "7 Days Return",
      desc: "Confidence in every thread we weave",
      color: "bg-[#ffcd00]/5",
    },
    {
      icon: assets.support_img,
      title: "24/7 Support",
      desc: "Our dedicated team is always here for you",
      color: "bg-[#ee2737]/5",
    },
  ];

  return (
    /* 1. Full-Width Breakout Container */
    <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-24 px-6 md:px-16 bg-white border-t border-slate-100">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-12 md:gap-16">
        {policies.map((policy, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center text-center group"
          >
            {/* Icon Container with Cultural Tints */}
            <div
              className={`w-20 h-20 ${policy.color} rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-white group-hover:shadow-lg`}
            >
              <img
                src={policy.icon}
                className="w-10 transition-transform duration-300 group-hover:scale-110"
                alt={policy.title}
              />
            </div>

            {/* Typography with Professional Spacing */}
            <h3 className="text-sm md:text-base font-bold uppercase tracking-[0.2em] text-slate-800 mb-3">
              {policy.title}
            </h3>

            <p className="text-xs md:text-sm text-slate-500 font-light leading-relaxed max-w-[220px]">
              {policy.desc}
            </p>

            {/* Subtle Hover Indicator */}
            <div className="w-8 h-[2px] bg-slate-100 mt-6 group-hover:bg-[#ffcd00] group-hover:w-16 transition-all duration-500"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default OurPolicy;

import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { FaRetweet, FaAward, FaHeadset } from "react-icons/fa"; // Optional: high-quality icons

const OurPolicy = () => {
  const policies = [
    {
      icon: assets.exchange_icon,
      title: "Effortless Exchange",
      desc: "Find your perfect silhouette with our seamless exchange process.",
      accent: "bg-[#009b44]",
    },
    {
      icon: assets.quality_icon,
      title: "7-Day Quality Guarantee",
      desc: "Every thread is inspected to meet the highest standards of Tibeb.",
      accent: "bg-[#ffcd00]",
    },
    {
      icon: assets.support_img,
      title: "Concierge Support",
      desc: "Our dedicated heritage specialists are available 24/7 for you.",
      accent: "bg-[#ee2737]",
    },
  ];

  return (
    <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-32 px-6 md:px-16 bg-white overflow-hidden">
      {/* Subtle Background Pattern (Habesha Weave Feel) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://transparenttextures.com')]"></div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          {policies.map((policy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="flex flex-col items-center text-center group"
            >
              {/* Refined Icon Container */}
              <div className="relative mb-10">
                {/* Cultural Shadow Glow */}
                <div
                  className={`absolute inset-0 blur-2xl opacity-10 rounded-full ${policy.accent}`}
                ></div>

                <div className="relative w-24 h-24 bg-gray-50 rounded-[2rem] flex items-center justify-center transition-all duration-700 group-hover:bg-[#33211D] group-hover:rotate-[10deg] shadow-sm group-hover:shadow-2xl">
                  <img
                    src={policy.icon}
                    className="w-10 h-10 object-contain transition-all duration-500 group-hover:invert group-hover:scale-110"
                    alt={policy.title}
                  />
                </div>

                {/* Cultural Dot Detail */}
                <div
                  className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full ${policy.accent} opacity-40`}
                ></div>
              </div>

              {/* Text Content */}
              <h3 className="text-[#33211D] text-xs font-black uppercase tracking-[0.4em] mb-4 group-hover:text-[#DA9F5B] transition-colors">
                {policy.title}
              </h3>

              <p className="text-gray-400 text-xs md:text-sm font-medium leading-relaxed max-w-[260px] uppercase tracking-wider opacity-80">
                {policy.desc}
              </p>

              {/* Modern Minimalist Divider */}
              <div className="mt-8 flex gap-1">
                <div className="w-1 h-1 rounded-full bg-gray-100 group-hover:bg-[#DA9F5B] transition-colors"></div>
                <div className="w-8 h-[1px] bg-gray-100 group-hover:bg-[#DA9F5B] group-hover:w-12 transition-all duration-500"></div>
                <div className="w-1 h-1 rounded-full bg-gray-100 group-hover:bg-[#DA9F5B] transition-colors"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPolicy;

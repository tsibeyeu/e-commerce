import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import {
  RiArrowRightUpLine,
  RiMapPinLine,
  RiMailLine,
  RiPhoneLine,
} from "react-icons/ri";

const Footer = () => {
  // Shared Wordmark Component for Brand Consistency
  const Logo = () => (
    <div className="group flex flex-col items-start">
      <h1 className="text-3xl font-black tracking-tighter leading-none text-[#33211D]">
        ETHIO<span className="text-[#DA9F5B]">KEMIS</span>
      </h1>
      <span className="text-[8px] font-black uppercase tracking-[0.6em] text-[#ee2737] -mt-1">
        Heritage Store
      </span>
    </div>
  );

  return (
    <footer className="bg-[#fdfdfd] text-[#33211D] pt-32 pb-12 border-t border-gray-100">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">
        {/* Upper Footer */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          {/* Brand Identity with Typography Logo */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col items-start gap-8">
            <Logo />
            <p className="text-gray-400 text-xl font-light leading-relaxed max-w-sm">
              Authentic artisanal Kemis, hand-woven and Sun-dried in the heart
              of Ethiopia. Driven by heritage, defined by Tibeb.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4 pt-4">
              {[FaInstagram, FaXTwitter, FaFacebookF, FaLinkedinIn].map(
                (Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-100 text-[#33211D] hover:bg-[#33211D] hover:text-[#DA9F5B] transition-all duration-500 shadow-sm"
                  >
                    <Icon size={18} />
                  </a>
                ),
              )}
            </div>
          </div>

          {/* Navigation Grid */}
          <div className="md:col-span-3 lg:col-span-3">
            <p className="text-[10px] font-black tracking-[0.3em] uppercase mb-10 text-gray-400">
              The Collection
            </p>
            <ul className="flex flex-col gap-5 text-sm font-black uppercase tracking-widest">
              {["Home", "Collection", "About Our Craft", "Sustainability"].map(
                (item) => (
                  <li
                    key={item}
                    className="group flex items-center gap-2 cursor-pointer w-fit"
                  >
                    <span className="group-hover:text-[#DA9F5B] transition-colors">
                      {item}
                    </span>
                    <RiArrowRightUpLine className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-[#DA9F5B]" />
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3 lg:col-span-4">
            <p className="text-[10px] font-black tracking-[0.3em] uppercase mb-10 text-gray-400">
              Contact
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4 group cursor-pointer">
                <RiPhoneLine
                  className="text-gray-300 group-hover:text-[#DA9F5B] transition-colors"
                  size={24}
                />
                <p className="text-2xl font-black tracking-tighter">
                  +251 911 223 344
                </p>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <RiMailLine
                  className="text-gray-300 group-hover:text-[#DA9F5B] transition-colors"
                  size={24}
                />
                <p className="text-sm font-black uppercase tracking-widest text-gray-500 hover:text-[#33211D] transition-colors underline underline-offset-8 decoration-gray-100">
                  hello@ethio-kemis.com
                </p>
              </div>
              <div className="flex items-start gap-4 pt-2">
                <RiMapPinLine className="text-[#DA9F5B] mt-1" size={24} />
                <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest max-w-[200px] leading-relaxed">
                  Bole Road, <br /> Addis Ababa, Ethiopia
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 text-[10px] font-black tracking-[0.2em] text-gray-300 uppercase">
            <p>© {new Date().getFullYear()} ETHIO-KEMIS LUXURY</p>
            <span className="hidden md:block text-gray-100">/</span>
            <p>Locally Weaved in Ethiopia</p>
          </div>

          {/* Subtle Flag Indicator instead of generic cards */}
          <div className="flex gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#009b44] opacity-20"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#ffcd00] opacity-20"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#ee2737] opacity-20"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import { assets } from "../assets/assets";
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
  return (
    <footer className="bg-[#fdfdfd] text-[#1a1a1a] pt-32 pb-12 border-t border-gray-100">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">
        {/* Upper Footer: Branding & Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          {/* Brand Identity */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col items-start gap-8">
            <img src={assets.logo} alt="Habesh Logo" className="w-40" />
            <p className="text-gray-500 text-xl font-light leading-relaxed max-w-sm">
              We curate high-quality essentials for the modern lifestyle. Driven
              by craft, defined by quality.
            </p>
            {/* Social Icons using React Icons */}
            <div className="flex gap-4 pt-4">
              {[FaInstagram, FaXTwitter, FaFacebookF, FaLinkedinIn].map(
                (Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 hover:bg-black hover:text-white transition-all duration-300 shadow-sm"
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
              The Company
            </p>
            <ul className="flex flex-col gap-5 text-base font-medium">
              {["Home", "About Us", "Delivery", "Privacy Policy"].map(
                (item) => (
                  <li
                    key={item}
                    className="group flex items-center gap-2 cursor-pointer w-fit"
                  >
                    <span className="group-hover:text-gray-400 transition-colors">
                      {item}
                    </span>
                    <RiArrowRightUpLine className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-gray-400" />
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3 lg:col-span-4">
            <p className="text-[10px] font-black tracking-[0.3em] uppercase mb-10 text-gray-400">
              Reach Out
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4 group cursor-pointer">
                <RiPhoneLine
                  className="text-gray-300 group-hover:text-black transition-colors"
                  size={24}
                />
                <p className="text-2xl font-bold tracking-tighter">
                  +251 943 456 789
                </p>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <RiMailLine
                  className="text-gray-300 group-hover:text-black transition-colors"
                  size={24}
                />
                <p className="text-lg font-medium text-gray-500 hover:text-black transition-colors underline underline-offset-8 decoration-gray-100">
                  contact@habesh.com
                </p>
              </div>
              <div className="flex items-start gap-4 pt-2">
                <RiMapPinLine className="text-gray-300 mt-1" size={24} />
                <p className="text-gray-500 font-light max-w-[200px]">
                  Bole, Addis Ababa, Ethiopia
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 text-[11px] font-bold tracking-widest text-gray-400 uppercase">
            <p>© 2024 HABESH E-COMMERCE</p>
            <span className="hidden md:block text-gray-200">|</span>
            <p>Locally Crafted in Ethiopia</p>
          </div>
          <div className="flex gap-8 items-center opacity-30 grayscale hover:opacity-100 transition-opacity">
            <img src={assets.visa_logo} alt="Visa" className="h-4" />
            <img
              src={assets.mastercard_logo}
              alt="Mastercard"
              className="h-4"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

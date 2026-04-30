import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center py-4 px-[5%] justify-between bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Typographic Logo to match Brand */}
      <div className="flex flex-col items-start leading-none">
        <h1 className="text-xl md:text-2xl font-black tracking-tighter text-[#33211D]">
          ETHIO<span className="text-[#DA9F5B]">KEMIS</span>
        </h1>
        <span className="text-[7px] font-black uppercase tracking-[0.4em] text-gray-400">
          Admin Console
        </span>
      </div>

      <button
        onClick={() => setToken("")}
        className="bg-[#33211D] text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#DA9F5B] hover:text-[#33211D] transition-all duration-300 shadow-lg active:scale-95"
      >
        Sign Out
      </button>
    </div>
  );
};

export default Navbar;

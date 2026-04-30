import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import {
  FaSearch,
  FaUserCircle,
  FaShoppingBag,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    Navigate,
    setCartItems,
    token,
    setToken,
  } = useContext(ShopContext);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    Navigate("/login");
    localStorage.removeItem("token");
    setCartItems({});
    setToken("");
  };

  // Modern Typography Logo
  const Logo = () => (
    <Link to="/" className="group flex flex-col items-start">
      <h1
        className={`text-2xl md:text-3xl font-black tracking-tighter leading-none transition-colors duration-500 ${scrolled ? "text-black" : "text-white"}`}
      >
        ETHIO<span className="text-[#ffcd00]">KEMIS</span>
      </h1>
      <span
        className={`text-[7px] font-black uppercase tracking-[0.6em] -mt-0.5 transition-colors duration-500 ${scrolled ? "text-[#ee2737]" : "text-[#DA9F5B]"}`}
      >
        Premium Heritage
      </span>
    </Link>
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-2xl py-3 border-b border-gray-100"
          : "bg-transparent py-7"
      }`}
    >
      <div className="w-full flex justify-between items-center px-6 md:px-16">
        {/* Left Side: Desktop Menu */}
        <ul className="hidden lg:flex gap-12 text-[10px] font-black tracking-[0.25em] uppercase">
          {["Home", "Collection", "About", "Contact"].map((item) => (
            <NavLink
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className={({ isActive }) =>
                `relative group transition-all duration-300 ${isActive ? "text-[#ffcd00]" : scrolled ? "text-gray-500" : "text-white/80"}`
              }
            >
              <p className="hover:text-[#ffcd00] transition-colors">{item}</p>
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#009b44] transition-all duration-500 group-hover:w-full"></span>
            </NavLink>
          ))}
        </ul>

        {/* Center: Luxury Wordmark */}
        <Logo />

        {/* Right Side: Pro Actions */}
        <div className="flex items-center gap-8">
          {/* Search */}
          <button
            onClick={() => setShowSearch(true)}
            className={`transition-all hover:scale-125 duration-300 ${scrolled ? "text-black" : "text-white"}`}
          >
            <FaSearch size={18} />
          </button>

          {/* Profile/Auth */}
          <div className="group relative">
            <button
              onClick={() => (token ? null : Navigate("/login"))}
              className={`transition-all hover:scale-125 duration-300 ${scrolled ? "text-black" : "text-white"}`}
            >
              <FaUserCircle size={20} />
            </button>

            {token && (
              <div className="absolute hidden group-hover:block right-0 pt-6 animate-in fade-in slide-in-from-top-2">
                <div className="flex flex-col w-52 py-4 bg-[#33211D] text-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-2xl border border-white/10 overflow-hidden">
                  <p
                    onClick={() => Navigate("/profile")}
                    className="px-6 py-3 cursor-pointer hover:bg-[#DA9F5B] hover:text-black transition font-black text-[10px] uppercase tracking-widest"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => Navigate("/orders")}
                    className="px-6 py-3 cursor-pointer hover:bg-[#DA9F5B] hover:text-black transition font-black text-[10px] uppercase tracking-widest"
                  >
                    Order History
                  </p>
                  <div className="mx-6 my-2 border-t border-white/10"></div>
                  <p
                    onClick={logout}
                    className="px-6 py-3 cursor-pointer text-[#ee2737] hover:bg-red-500 hover:text-white transition font-black text-[10px] uppercase tracking-widest"
                  >
                    Sign Out
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative group">
            <div
              className={`transition-all group-hover:scale-110 duration-300 ${scrolled ? "text-black" : "text-white"}`}
            >
              <FaShoppingBag size={20} />
            </div>
            <p className="absolute -top-2.5 -right-2.5 w-5 h-5 flex items-center justify-center bg-[#ee2737] text-white rounded-full text-[9px] font-black shadow-lg border-2 border-white">
              {getCartCount()}
            </p>
          </Link>

          {/* Mobile Toggle */}
          <button
            onClick={() => setVisible(true)}
            className={`lg:hidden transition-all active:scale-90 ${scrolled ? "text-black" : "text-white"}`}
          >
            <FaBars size={24} />
          </button>
        </div>
      </div>

      {/* Modern Side Navigation for Mobile */}
      <div
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setVisible(false)}
      >
        <div
          className={`absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl transition-transform duration-500 transform ${visible ? "translate-x-0" : "translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="font-black text-xs uppercase tracking-[0.3em] text-gray-400">
                Navigation
              </h2>
              <button
                onClick={() => setVisible(false)}
                className="p-3 bg-white rounded-full shadow-sm text-black"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <nav className="flex flex-col p-10 space-y-8">
              {["Home", "Collection", "About", "Contact"].map((item) => (
                <NavLink
                  key={item}
                  onClick={() => setVisible(false)}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-4xl font-black uppercase tracking-tighter hover:text-[#ffcd00] transition-colors"
                >
                  {item}
                </NavLink>
              ))}
            </nav>

            <div className="mt-auto p-10 bg-gray-50 border-t border-gray-100">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#009b44] mb-4">
                Ethio-Chic Luxury Store
              </p>
              <div className="flex gap-4 h-1 w-full">
                <div className="flex-1 bg-[#009b44]"></div>
                <div className="flex-1 bg-[#ffcd00]"></div>
                <div className="flex-1 bg-[#ee2737]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

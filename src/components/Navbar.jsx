import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

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

  return (
    /* Change 1: Added left-0 right-0 and kept w-full to force edge-to-edge */
    <nav
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      {/* Change 2: Removed max-w-[1440px] and mx-auto to allow full width expansion */}
      <div className="w-full flex justify-between items-center px-6 md:px-12">
        {/* Logo */}
        <Link to="/">
          <img
            src={assets.logo}
            className="w-32 md:w-40 transition-all"
            alt="Logo"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 text-sm font-bold tracking-[0.1em] uppercase">
          {["Home", "Collection", "About", "Contact"].map((item) => (
            <NavLink
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="relative group transition-colors hover:text-[#009b44]"
            >
              <p className={scrolled ? "text-gray-700" : "text-white"}>
                {item}
              </p>
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#ffcd00] transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          ))}
        </ul>

        {/* Icons Area */}
        <div className="flex items-center gap-6">
          <img
            onClick={() => setShowSearch(true)}
            src={assets.search_icon}
            alt="search"
            className={`w-5 cursor-pointer hover:scale-110 transition-transform ${!scrolled && "invert"}`}
          />

          <div className="group relative">
            <img
              onClick={() => (token ? null : Navigate("/login"))}
              className={`cursor-pointer w-5 hover:scale-110 transition-transform ${!scrolled && "invert"}`}
              src={assets.profile_icon}
              alt="profile"
            />
            {token && (
              <div className="absolute hidden group-hover:block right-0 pt-4 animate-fadeIn">
                <div className="flex flex-col w-44 py-3 bg-white shadow-xl rounded-xl border border-gray-100 overflow-hidden">
                  <p
                    onClick={() => Navigate("/profile")}
                    className="px-5 py-2 cursor-pointer hover:bg-gray-50 hover:text-[#009b44] text-gray-700"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => Navigate("/orders")}
                    className="px-5 py-2 cursor-pointer hover:bg-gray-50 hover:text-[#009b44] text-gray-700"
                  >
                    Orders
                  </p>
                  <hr className="my-1 border-gray-100" />
                  <p
                    onClick={logout}
                    className="px-5 py-2 cursor-pointer hover:bg-red-50 text-red-500 font-bold"
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>

          <Link to="/cart" className="relative">
            <img
              src={assets.cart_icon}
              alt="cart icon"
              className={`w-5 ${!scrolled && "invert"}`}
            />
            <p className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center bg-[#ee2737] text-white rounded-full text-[9px] font-bold shadow-sm">
              {getCartCount()}
            </p>
          </Link>

          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className={`cursor-pointer md:hidden w-6 ${!scrolled && "invert"}`}
            alt="menu"
          />
        </div>
      </div>

      {/* SearchBar Component should be placed here in App.js or similar for full width */}

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 overflow-hidden transition-all duration-500 bg-white ${visible ? "w-full" : "w-0"}`}
      >
        <div className="flex flex-col text-gray-700 h-full">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-6 border-b border-gray-100 cursor-pointer bg-gray-50"
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
            <p className="font-bold uppercase tracking-widest">Close Menu</p>
          </div>
          {["Home", "Collection", "About", "Contact"].map((item) => (
            <NavLink
              key={item}
              onClick={() => setVisible(false)}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="p-6 text-xl font-light border-b border-gray-50 hover:pl-10 transition-all duration-300"
            >
              {item}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

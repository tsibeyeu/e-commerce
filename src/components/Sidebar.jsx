import React from "react";
import { NavLink } from "react-router-dom";
import {
  RiDashboardFill,
  RiAddCircleFill,
  RiListCheck2,
  RiShoppingBag3Fill,
} from "react-icons/ri";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/", icon: <RiDashboardFill size={20} /> },
    { name: "Add Items", path: "/add", icon: <RiAddCircleFill size={20} /> },
    { name: "Inventory", path: "/list", icon: <RiListCheck2 size={20} /> },
    { name: "Orders", path: "/order", icon: <RiShoppingBag3Fill size={20} /> },
  ];

  return (
    <div className="min-h-screen w-[18%] bg-white border-r border-gray-100 pt-10">
      <div className="flex flex-col gap-2 pl-6">
        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-300 mb-4 ml-4">
          Management
        </p>

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-4 px-5 py-4 rounded-l-[1.5rem] transition-all duration-300 group
              ${
                isActive
                  ? "bg-[#FBF9F4] text-[#DA9F5B] border-r-4 border-[#DA9F5B] shadow-sm"
                  : "text-gray-400 hover:text-[#33211D] hover:bg-gray-50"
              }
            `}
          >
            <span className="transition-transform group-hover:scale-110">
              {item.icon}
            </span>
            <p className="hidden md:block text-[11px] font-black uppercase tracking-widest">
              {item.name}
            </p>
          </NavLink>
        ))}
      </div>

      {/* Cultural Footer Detail */}
      <div className="absolute bottom-10 left-8 hidden md:block">
        <div className="flex gap-1 mb-2">
          <div className="w-1 h-1 rounded-full bg-[#009b44] opacity-30"></div>
          <div className="w-1 h-1 rounded-full bg-[#ffcd00] opacity-30"></div>
          <div className="w-1 h-1 rounded-full bg-[#ee2737] opacity-30"></div>
        </div>
        <p className="text-[8px] font-black text-gray-200 uppercase tracking-widest">
          v1.0.2 Premium
        </p>
      </div>
    </div>
  );
};

export default Sidebar;

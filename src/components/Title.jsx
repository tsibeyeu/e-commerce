import React from "react";

const Title = ({ title1, title2 }) => {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="flex items-center gap-3">
        {/* Soft, light text for the first word */}
        <p className="text-slate-400 font-light tracking-[0.3em] text-lg sm:text-2xl uppercase">
          {title1}
          {/* Bold, darker text for the second word to create contrast */}
          <span className="text-slate-900 font-bold ml-2">{title2}</span>
        </p>
      </div>

      {/* Unique Cultural Underline: A thin line with a gold center-point */}
      <div className="flex items-center gap-1 mt-2">
        <span className="w-8 h-[1px] bg-slate-200"></span>
        <span className="w-2 h-[2px] bg-[#ffcd00] rounded-full"></span>
        <span className="w-8 h-[1px] bg-slate-200"></span>
      </div>
    </div>
  );
};

export default Title;

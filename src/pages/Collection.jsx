import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import {
  RiFilterOffLine,
  RiArrowRightUpLine,
  RiMenu5Line,
} from "react-icons/ri";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleSelection = (setter, value) => {
    setter((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value],
    );
  };

  const applyFiltersAndSort = () => {
    let temp = [...products];
    if (showSearch && search)
      temp = temp.filter((i) =>
        i.name.toLowerCase().includes(search.toLowerCase()),
      );
    if (category.length > 0)
      temp = temp.filter((i) => category.includes(i.category));
    if (subCategory.length > 0)
      temp = temp.filter((i) => subCategory.includes(i.subCategory));

    if (sortType === "low-high") temp.sort((a, b) => a.price - b.price);
    else if (sortType === "high-low") temp.sort((a, b) => b.price - a.price);
    setFilterProduct(temp);
  };

  useEffect(() => {
    applyFiltersAndSort();
  }, [category, subCategory, search, showSearch, products, sortType]);

  return (
    <div className="bg-[#fafafa] min-h-screen">
      {/* 1. Constrained width for better product size */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-20 pb-40">
        {/* EDITORIAL HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-4 text-[10px] font-black tracking-[0.5em] uppercase text-gray-400">
              <span className="w-8 h-[1px] bg-gray-300"></span> Seasonal Archive
            </div>
            <Title title1={"THE"} title2={"COLLECTION"} />
            <p className="mt-6 text-gray-500 text-lg font-light leading-relaxed max-w-lg">
              Refined pieces curated for the modern wardrobe.
            </p>
          </div>

          <div className="flex items-center gap-8 w-full md:w-auto">
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="bg-transparent text-[11px] font-black uppercase tracking-[0.3em] outline-none cursor-pointer border-b border-gray-200 pb-2 hover:border-black transition-all"
            >
              <option value="relevant">SORT / RELEVANT</option>
              <option value="low-high">PRICE: LOW-HIGH</option>
              <option value="high-low">PRICE: HIGH-LOW</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-20">
          {/* ASIDE: FILTERING */}
          <aside className="lg:w-[240px] shrink-0">
            <div className="sticky top-32 space-y-12">
              {/* TOGGLE HEADER */}
              <div
                className="flex items-center justify-between group cursor-pointer"
                onClick={() => setShowFilter(!showFilter)}
              >
                <h4 className="text-[10px] font-black tracking-[0.5em] uppercase">
                  Refine By
                </h4>
                <RiMenu5Line
                  className={`transition-transform duration-500 ${showFilter ? "rotate-90" : ""}`}
                />
              </div>

              {/* FILTER CONTENT: Fixed the conditional logic here */}
              <div
                className={`space-y-12 transition-all duration-500 ease-in-out ${
                  showFilter
                    ? "block opacity-100"
                    : "hidden lg:block lg:opacity-100"
                }`}
              >
                {/* Gender Group */}
                <div className="space-y-6">
                  <p className="text-[9px] font-black text-gray-300 tracking-[0.4em] uppercase">
                    Gender
                  </p>
                  <div className="flex flex-col gap-4">
                    {["Men", "Women", "Kids"].map((item) => (
                      <label
                        key={item}
                        className="flex items-center justify-between group cursor-pointer"
                      >
                        <span
                          className={`text-sm transition-all ${category.includes(item) ? "font-bold text-black" : "text-gray-500"}`}
                        >
                          {item}
                        </span>
                        <input
                          type="checkbox"
                          value={item}
                          checked={category.includes(item)}
                          onChange={(e) =>
                            toggleSelection(setCategory, e.target.value)
                          }
                          className="peer hidden"
                        />
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-200 peer-checked:bg-black transition-all"></div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Category Group */}
                <div className="space-y-6">
                  <p className="text-[9px] font-black text-gray-300 tracking-[0.4em] uppercase">
                    Category
                  </p>
                  <div className="flex flex-col gap-4">
                    {["Topwear", "Bottomwear", "Winterwear"].map((item) => (
                      <label
                        key={item}
                        className="flex items-center justify-between group cursor-pointer"
                      >
                        <span
                          className={`text-sm transition-all ${subCategory.includes(item) ? "font-bold text-black" : "text-gray-500"}`}
                        >
                          {item}
                        </span>
                        <input
                          type="checkbox"
                          value={item}
                          checked={subCategory.includes(item)}
                          onChange={(e) =>
                            toggleSelection(setSubCategory, e.target.value)
                          }
                          className="peer hidden"
                        />
                        <div className="w-1.5 h-1.5 bg-gray-200 peer-checked:bg-black transition-all"></div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Reset Button */}
                {(category.length > 0 || subCategory.length > 0) && (
                  <button
                    onClick={() => {
                      setCategory([]);
                      setSubCategory([]);
                    }}
                    className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-red-500 pt-4 hover:opacity-70 transition-opacity"
                  >
                    <RiFilterOffLine /> Clear All
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* 2. MAIN GRID: Optimized for larger product items */}
          <main className="flex-1">
            {filterProduct.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-20">
                {filterProduct.map((item, index) => (
                  <div
                    key={index}
                    className="group animate-in fade-in slide-in-from-bottom-6 duration-700"
                  >
                    <ProductItem
                      name={item.name}
                      id={item._id}
                      price={item.price}
                      image={item.image}
                    />
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[10px] font-black tracking-widest text-gray-300 uppercase">
                        View Article
                      </span>
                      <RiArrowRightUpLine className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-[40vh] flex items-center justify-center border-t border-gray-100">
                <p className="text-gray-400 font-light italic">
                  No matching results found.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Collection;

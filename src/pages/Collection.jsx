import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";
import { RiFilterOffLine, RiMenu5Line } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";

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

    // Lineage Filter (Men, Women, Kids)
    if (category.length > 0)
      temp = temp.filter((i) => category.includes(i.category));

    // Piece Filter (Kemis, Kuta, etc.)
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
    <div className="bg-white min-h-screen relative overflow-hidden">
      {/* Editorial Background Text */}
      <div className="absolute top-40 right-[-5%] text-[15vw] font-black text-gray-50 leading-none pointer-events-none select-none uppercase tracking-tighter z-0">
        Archive
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-16 pt-32 pb-40 relative z-10">
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-[1px] w-12 bg-[#DA9F5B]"></div>
              <p className="text-[#DA9F5B] font-black uppercase text-[10px] tracking-[0.5em]">
                Authentic Weaves
              </p>
            </motion.div>
            <h1 className="text-5xl md:text-8xl font-black text-[#33211D] uppercase tracking-tighter leading-none mb-6">
              THE{" "}
              <span className="italic font-serif normal-case text-[#33211D]/80">
                Gallery.
              </span>
            </h1>
          </div>

          <div className="w-full md:w-auto">
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="w-full md:w-64 bg-gray-50 p-4 text-[10px] font-black uppercase tracking-[0.3em] outline-none rounded-xl border border-transparent focus:border-[#DA9F5B] transition-all"
            >
              <option value="relevant">SORT / RELEVANCE</option>
              <option value="low-high">PRICE: LOW TO HIGH</option>
              <option value="high-low">PRICE: HIGH TO LOW</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* SIDEBAR FILTER */}
          <aside className="lg:w-[260px] shrink-0">
            <div className="sticky top-32 space-y-8">
              {/* TOGGLE BUTTON FOR MOBILE */}
              <button
                className="w-full flex items-center justify-between border-b border-gray-100 pb-4 lg:cursor-default"
                onClick={() => setShowFilter(!showFilter)}
              >
                <h4 className="text-[10px] font-black tracking-[0.5em] uppercase text-[#33211D]">
                  Refine By
                </h4>
                <RiMenu5Line
                  size={18}
                  className={`lg:hidden transition-transform ${showFilter ? "rotate-180" : ""}`}
                />
              </button>

              {/* WRAPPER FOR TOGGLE LOGIC */}
              <div
                className={`${showFilter ? "block" : "hidden"} lg:block space-y-12 animate-in fade-in slide-in-from-top-2 duration-300 lg:animate-none`}
              >
                {/* LINEAGE (GENDER) */}
                <div className="space-y-6">
                  <p className="text-[9px] font-black text-gray-300 tracking-[0.4em] uppercase">
                    Lineage
                  </p>
                  <div className="flex flex-col gap-4">
                    {["Men", "Women", "Kids"].map((item) => (
                      <label
                        key={item}
                        className="flex items-center justify-between group cursor-pointer"
                      >
                        <span
                          className={`text-xs font-black uppercase tracking-widest transition-all ${category.includes(item) ? "text-[#33211D]" : "text-gray-400"}`}
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
                          className="hidden peer"
                        />
                        <div className="w-2 h-2 rounded-full border border-gray-200 peer-checked:bg-[#DA9F5B] peer-checked:border-[#DA9F5B] transition-all scale-75 peer-checked:scale-100"></div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* THE PIECE (SUB-CATEGORY) */}
                <div className="space-y-6">
                  <p className="text-[9px] font-black text-gray-300 tracking-[0.4em] uppercase">
                    The Piece
                  </p>
                  <div className="flex flex-col gap-4">
                    {["Kemis", "Habesha Libs", "Kuta & Shama"].map((item) => (
                      <label
                        key={item}
                        className="flex items-center justify-between group cursor-pointer"
                      >
                        <span
                          className={`text-xs font-black uppercase tracking-widest transition-all ${subCategory.includes(item) ? "text-[#33211D]" : "text-gray-400"}`}
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
                          className="hidden peer"
                        />
                        <div className="w-4 h-[1px] bg-gray-200 peer-checked:bg-[#33211D] peer-checked:w-8 transition-all"></div>
                      </label>
                    ))}
                  </div>
                </div>

                <AnimatePresence>
                  {(category.length > 0 || subCategory.length > 0) && (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => {
                        setCategory([]);
                        setSubCategory([]);
                      }}
                      className="flex items-center gap-2 text-[9px] font-black tracking-widest uppercase text-red-500 pt-4"
                    >
                      <RiFilterOffLine /> Reset Filters
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </aside>

          {/* PRODUCT GRID */}
          <main className="flex-1">
            {filterProduct.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
                {filterProduct.map((item, index) => (
                  <motion.div
                    key={item._id || index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                  >
                    <ProductItem
                      name={item.name}
                      id={item._id}
                      price={item.price}
                      image={item.image}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="h-[40vh] flex flex-col items-center justify-center text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300">
                  Archive empty for this selection
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

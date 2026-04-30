import React, { useState } from "react";
import { assets } from "../assets/assets.js";
import axios from "axios";
import { backend_url } from "../App.jsx";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");

  // FIXED: Default must match backend enum ('Kemis', 'Habesha Libs', 'Kuta & Shama')
  const [subCategory, setSubCategory] = useState("Kemis");

  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backend_url + "/api/product/add",
        formData,
        {
          headers: { token },
        },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
        setSizes([]);
        setBestseller(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full gap-4 items-start p-8 bg-white rounded-[2rem] shadow-sm border border-gray-100"
    >
      {/* Upload Section */}
      <div className="w-full">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">
          Gallery Photos
        </p>
        <div className="flex gap-4">
          {[image1, image2, image3, image4].map((img, index) => (
            <label
              key={index}
              htmlFor={`image${index + 1}`}
              className="cursor-pointer"
            >
              <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-gray-100 flex items-center justify-center overflow-hidden hover:border-[#DA9F5B] transition-colors bg-gray-50">
                <img
                  className="w-full h-full object-cover"
                  src={!img ? assets.upload_area : URL.createObjectURL(img)}
                  alt=""
                />
              </div>
              <input
                onChange={(e) =>
                  [setImage1, setImage2, setImage3, setImage4][index](
                    e.target.files[0],
                  )
                }
                type="file"
                id={`image${index + 1}`}
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="w-full max-w-[500px] space-y-4">
        <div>
          <p className="text-[10px] font-black uppercase text-gray-400 mb-2">
            Product name
          </p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 ring-[#DA9F5B] font-bold"
            type="text"
            placeholder="e.g. Royal Gonder Kemis"
            required
          />
        </div>

        <div>
          <p className="text-[10px] font-black uppercase text-gray-400 mb-2">
            Heritage Description
          </p>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 ring-[#DA9F5B] h-32"
            placeholder="Describe the weaving style and Tibeb patterns..."
            required
          />
        </div>
      </div>

      {/* Selection Section */}
      <div className="flex flex-wrap gap-6 w-full">
        <div className="flex-1 min-w-[150px]">
          <p className="text-[10px] font-black uppercase text-gray-400 mb-2">
            Lineage
          </p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl font-bold"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div className="flex-1 min-w-[150px]">
          <p className="text-[10px] font-black uppercase text-gray-400 mb-2">
            Piece Type
          </p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl font-bold"
          >
            <option value="Kemis">Kemis</option>
            <option value="Habesha Libs">Habesha Libs</option>
            <option value="Kuta & Shama">Kuta & Shama</option>
          </select>
        </div>

        <div className="w-32">
          <p className="text-[10px] font-black uppercase text-gray-400 mb-2">
            Price (ETB)
          </p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl font-bold"
            type="Number"
            placeholder="0.00"
            required
          />
        </div>
      </div>

      {/* Sizes Section */}
      <div className="w-full">
        <p className="text-[10px] font-black uppercase text-gray-400 mb-3">
          Available Sizes
        </p>
        <div className="flex gap-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((i) => i !== size)
                    : [...prev, size],
                )
              }
            >
              <p
                className={`px-4 py-2 rounded-xl cursor-pointer font-black text-xs transition-all ${sizes.includes(size) ? "bg-[#33211D] text-white shadow-lg" : "bg-gray-100 text-gray-400"}`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bestseller Check */}
      <div
        className="flex items-center gap-3 mt-2 bg-gray-50 p-4 rounded-2xl cursor-pointer"
        onClick={() => setBestseller(!bestseller)}
      >
        <input
          type="checkbox"
          checked={bestseller}
          onChange={() => {}} // Handled by div click
          className="accent-[#33211D] w-4 h-4"
        />
        <label className="text-[10px] font-black uppercase tracking-widest text-[#33211D] cursor-pointer">
          Highlight as Bestseller
        </label>
      </div>

      <button
        type="submit"
        className="w-full max-w-[200px] py-4 mt-6 bg-[#33211D] text-white rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-[#DA9F5B] transition-all shadow-xl active:scale-95"
      >
        Launch Product
      </button>
    </form>
  );
};

export default Add;

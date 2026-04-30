import axios from "axios";
import React, { useEffect, useState } from "react";
import { backend_url, currency } from "../App";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { RiDeleteBinLine, RiTShirt2Line, RiEyeLine } from "react-icons/ri";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(backend_url + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products.reverse()); // Newest first
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load inventory");
    } finally {
      setLoading(false);
    }
  };

  const productRemove = async (id, name) => {
    // Pro Confirmation Modal
    Swal.fire({
      title: "Remove from Archive?",
      text: `Are you sure you want to delete ${name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#33211D",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Remove it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(
            backend_url + "/api/product/remove",
            { id },
            { headers: { token } },
          );
          if (response.data.success) {
            toast.success("Piece removed successfully");
            await fetchList();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error("Deletion failed");
        }
      }
    });
  };

  useEffect(() => {
    fetchList();
  }, []);

  if (loading)
    return (
      <div className="flex h-[60vh] items-center justify-center font-black uppercase tracking-[0.4em] text-gray-300 animate-pulse">
        Reviewing Archive...
      </div>
    );

  return (
    <div className="p-2">
      {/* Editorial Header */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-black text-[#33211D] uppercase tracking-tighter">
            Inventory Archive
          </h2>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">
            {list.length} Masterpieces in stock
          </p>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-[10px] uppercase font-black text-gray-400 tracking-widest">
              <th className="p-6">Piece</th>
              <th className="hidden md:table-cell p-6">Lineage</th>
              <th className="hidden md:table-cell p-6">Piece Type</th>
              <th className="p-6">Price</th>
              <th className="p-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {list.map((item, index) => (
              <tr
                key={index}
                className="group hover:bg-gray-50/80 transition-colors cursor-default"
              >
                {/* Image & Name */}
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-20 rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 shadow-inner shrink-0">
                      <img
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        src={item.image[0]}
                        alt={item.name}
                      />
                    </div>
                    <div>
                      <p className="font-black text-[#33211D] uppercase text-sm tracking-tight">
                        {item.name}
                      </p>
                      <p className="text-[10px] font-bold text-[#DA9F5B] uppercase tracking-widest">
                        #{item._id.slice(-6)}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className="hidden md:table-cell p-6">
                  <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-[10px] font-black uppercase text-gray-500">
                    {item.category}
                  </span>
                </td>

                {/* Sub-Category */}
                <td className="hidden md:table-cell p-6">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-tight">
                    {item.subCategory}
                  </p>
                </td>

                {/* Price */}
                <td className="p-6">
                  <p className="font-black text-[#33211D] text-sm">
                    {parseFloat(item.price).toLocaleString()}
                    <span className="text-[10px] ml-1 opacity-40">
                      {currency}
                    </span>
                  </p>
                </td>

                {/* Actions */}
                <td className="p-6">
                  <div className="flex justify-end gap-2">
                    <button className="p-3 text-gray-300 hover:text-[#33211D] transition-colors bg-gray-50 rounded-xl">
                      <RiEyeLine size={18} />
                    </button>
                    <button
                      onClick={() => productRemove(item._id, item.name)}
                      className="p-3 text-red-300 hover:text-red-500 hover:bg-red-50 transition-all rounded-xl"
                    >
                      <RiDeleteBinLine size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {list.length === 0 && (
          <div className="p-20 text-center flex flex-col items-center">
            <RiTShirt2Line className="text-gray-100 text-6xl mb-4" />
            <p className="text-gray-400 font-black uppercase text-xs tracking-widest">
              No items found in archive
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;

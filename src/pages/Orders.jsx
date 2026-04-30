import React, { useEffect, useState } from "react";
import axios from "axios";
import { backend_url, currency } from "../App.jsx";
import { toast } from "react-toastify";
import {
  RiTruckLine,
  RiMapPin2Line,
  RiUserLine,
  RiTimeLine,
  RiMoneyDollarCircleLine,
} from "react-icons/ri";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        backend_url + "/api/order/list",
        {},
        { headers: { token } },
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse()); // Newest orders first
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to sync orders");
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backend_url + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } },
      );
      if (response.data.success) {
        toast.success("Shipment status updated");
        await fetchAllOrders();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Order Placed":
        return "bg-blue-50 text-blue-600 border-blue-100";
      case "Packing":
        return "bg-amber-50 text-amber-600 border-amber-100";
      case "Shipped":
        return "bg-purple-50 text-purple-600 border-purple-100";
      case "Out for delivery":
        return "bg-indigo-50 text-indigo-600 border-indigo-100";
      case "Delivery":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  if (loading)
    return (
      <div className="flex h-[60vh] items-center justify-center font-black uppercase tracking-[0.4em] text-gray-300 animate-pulse">
        Syncing Shipments...
      </div>
    );

  return (
    <div className="p-2">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl font-black text-[#33211D] uppercase tracking-tighter">
          Order Dispatch
        </h2>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">
          Managing {orders.length} active shipments
        </p>
      </div>

      <div className="space-y-6">
        {orders.map((order, index) => (
          <div
            key={index}
            className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex flex-col xl:flex-row gap-10 hover:shadow-md transition-shadow"
          >
            {/* 1. Parcel Status Icon */}
            <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-[2rem] min-w-[120px] h-fit">
              <RiTruckLine
                size={32}
                className={
                  order.payment ? "text-emerald-500" : "text-[#DA9F5B]"
                }
              />
              <p className="mt-4 text-[10px] font-black uppercase tracking-tighter text-gray-400">
                Parcel ID
              </p>
              <p className="font-black text-[#33211D] text-xs">
                #{order._id.slice(-6)}
              </p>
            </div>

            {/* 2. Items & Customer Info */}
            <div className="flex-1 space-y-6">
              {/* Piece List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 bg-gray-50/50 p-2 rounded-xl"
                  >
                    <span className="w-6 h-6 flex items-center justify-center bg-[#33211D] text-white rounded-md text-[10px] font-bold">
                      {item.quantity}
                    </span>
                    <p className="text-xs font-black text-[#33211D] uppercase tracking-tight">
                      {item.name}{" "}
                      <span className="text-gray-400 ml-2">({item.size})</span>
                    </p>
                  </div>
                ))}
              </div>

              {/* Customer Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-gray-50">
                <div className="flex gap-4">
                  <RiUserLine className="text-[#DA9F5B] shrink-0" size={20} />
                  <div>
                    <p className="font-black text-[#33211D] uppercase text-sm">
                      {order.address.firstName} {order.address.lastName}
                    </p>
                    <p className="text-xs font-medium text-gray-500 mt-1">
                      {order.address.phone}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <RiMapPin2Line
                    className="text-[#DA9F5B] shrink-0"
                    size={20}
                  />
                  <p className="text-xs font-medium text-gray-400 leading-relaxed italic">
                    {order.address.street}, {order.address.city},{" "}
                    {order.address.state}
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Transaction Details */}
            <div className="flex flex-col justify-between gap-6 xl:w-[200px] xl:border-l xl:border-gray-50 xl:pl-10">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-[10px] font-black uppercase text-gray-300 tracking-widest">
                    Amount
                  </p>
                  <p className="font-black text-[#33211D] text-lg">
                    {parseFloat(order.amount).toLocaleString()} {currency}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-black uppercase text-gray-300 tracking-widest">
                    Payment
                  </p>
                  <span
                    className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${order.payment ? "text-emerald-500 bg-emerald-50" : "text-amber-500 bg-amber-50"}`}
                  >
                    {order.payment ? "Verified" : "COD"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-gray-400">
                  <RiTimeLine size={14} />
                  <p className="text-[10px] font-bold">
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* 4. Action Dropdown */}
              <div className="space-y-2">
                <p className="text-[9px] font-black uppercase text-gray-400 ml-1">
                  Logistics Status
                </p>
                <select
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status}
                  className={`w-full p-3 rounded-xl font-black text-[10px] uppercase tracking-widest border-2 outline-none cursor-pointer transition-all ${getStatusColor(order.status)}`}
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivery">Success</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

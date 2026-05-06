import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Doughnut } from "react-chartjs-2";
import {
  RiMoneyDollarCircleFill,
  RiShoppingBag3Fill,
  RiTShirt2Fill,
  RiArrowUpSLine,
  RiHistoryLine,
} from "react-icons/ri";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const Dashboard = ({ token, backend_url }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Inside Dashboard.jsx
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${backend_url}/api/admin/stats`, {
          headers: { token }, // Make sure 'token' is passed from App.jsx
        });

        console.log("SERVER DATA:", res.data); // <--- CHECK THIS IN F12 CONSOLE

        if (res.data?.success) {
          setStats(res.data.stats);
        } else {
          console.error("Backend failed:", res.data.message);
        }
      } catch (err) {
        console.error("Dashboard Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [token, backend_url]);

  const lineData = {
    labels: stats?.ordersOverTime?.labels || [],
    datasets: [
      {
        label: "Orders",
        data: stats?.ordersOverTime?.values || [],
        borderColor: "#DA9F5B",
        backgroundColor: "rgba(218, 159, 91, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: "#33211D",
      },
    ],
  };

  const doughnutData = {
    labels: stats?.revenueByCategory?.labels || [],
    datasets: [
      {
        data: stats?.revenueByCategory?.values || [],
        backgroundColor: [
          "#33211D",
          "#DA9F5B",
          "#E5E7EB",
          "#ee2737",
          "#009b44",
        ],
        borderWidth: 0,
        hoverOffset: 15,
      },
    ],
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center font-black uppercase tracking-[0.4em] text-gray-300 animate-pulse">
        Analyzing Heritage...
      </div>
    );

  return (
    <div className="p-8 pb-20 bg-[#fafafa] min-h-screen">
      <header className="mb-12">
        <h1 className="text-3xl font-black text-[#33211D] uppercase tracking-tighter">
          Business Overview
        </h1>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">
          Real-time performance
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <StatCard
          title="Total Revenue"
          value={`${stats?.totalRevenue?.toLocaleString() || 0} ETB`}
          icon={<RiMoneyDollarCircleFill size={24} />}
          trend={stats?.revenueGrowth}
        />
        <StatCard
          title="Total Orders"
          value={stats?.totalOrders || 0}
          icon={<RiShoppingBag3Fill size={24} />}
          trend={stats?.orderGrowth}
        />
        <StatCard
          title="Inventory"
          value={stats?.productsCount || 0}
          icon={<RiTShirt2Fill size={24} />}
          trend="Live"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 h-[450px]">
          <h3 className="font-black text-xs uppercase tracking-widest text-gray-400 mb-6">
            Order Activity (30 Days)
          </h3>
          <div className="h-[320px]">
            <Line
              data={lineData}
              options={{
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } },
              }}
            />
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
          <h3 className="font-black text-xs uppercase tracking-widest text-gray-400 mb-8 text-center">
            Category Split
          </h3>
          <div className="h-[280px] flex items-center justify-center">
            <Doughnut
              data={doughnutData}
              options={{
                cutout: "80%",
                plugins: { legend: { position: "bottom" } },
              }}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex items-center gap-3">
          <RiHistoryLine className="text-[#DA9F5B]" size={20} />
          <h3 className="font-black text-xs uppercase tracking-widest text-[#33211D]">
            Recent Transactions
          </h3>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 text-[10px] font-black uppercase text-gray-400 tracking-widest">
            <tr>
              <th className="p-6">Order ID</th>
              <th className="p-6">Amount</th>
              <th className="p-6">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {stats?.recentOrders?.map((order, index) => (
              <tr
                key={index}
                className="text-xs font-bold text-[#33211D] hover:bg-gray-50 transition-colors"
              >
                <td className="p-6 uppercase">#{order._id.slice(-6)}</td>
                <td className="p-6">{order.amount.toLocaleString()} ETB</td>
                <td className="p-6">
                  <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[9px] uppercase font-black">
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, trend }) => (
  <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 group transition-all">
    <div className="flex justify-between items-start mb-6">
      <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#33211D] group-hover:bg-[#DA9F5B] group-hover:text-white transition-all duration-500">
        {icon}
      </div>
      <div className="flex items-center text-[10px] font-black uppercase text-emerald-600">
        {trend === "Live" ? trend : `↑ ${trend}%`}
      </div>
    </div>
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
      {title}
    </p>
    <p className="text-2xl font-black text-[#33211D] tracking-tighter">
      {value}
    </p>
  </div>
);

export default Dashboard;

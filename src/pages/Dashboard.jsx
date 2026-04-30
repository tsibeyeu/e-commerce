import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Doughnut } from "react-chartjs-2";
import {
  RiMoneyDollarCircleFill,
  RiShoppingBag3Fill,
  RiTShirt2Fill,
  RiArrowUpSLine,
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
);

const Dashboard = ({ token, backend_url }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${backend_url}/api/admin/stats`, {
          headers: { token },
        });
        if (res.data?.success) setStats(res.data.stats);
      } catch (err) {
        console.error("Dashboard Fetch Error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [token, backend_url]);

  const lineData = {
    labels: stats?.ordersOverTime?.labels || [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun",
    ],
    datasets: [
      {
        label: "Orders",
        data: stats?.ordersOverTime?.values || [0, 0, 0, 0, 0, 0, 0],
        borderColor: "#DA9F5B",
        backgroundColor: "rgba(218, 159, 91, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
      },
    ],
  };

  const doughnutData = {
    labels: stats?.revenueByCategory?.labels || ["Men", "Women", "Kids"],
    datasets: [
      {
        data: stats?.revenueByCategory?.values || [1, 1, 1],
        backgroundColor: ["#33211D", "#DA9F5B", "#E5E7EB"],
        borderWidth: 0,
        hoverOffset: 10,
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
    <div className="p-8">
      {/* Editorial Header */}
      <header className="mb-12">
        <h1 className="text-3xl font-black text-[#33211D] uppercase tracking-tighter">
          Business Overview
        </h1>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">
          Real-time performance of Ethio-Kemis
        </p>
      </header>

      {/* Modern Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <StatCard
          title="Total Revenue"
          value={`${stats?.totalRevenue?.toLocaleString() || 0} ETB`}
          icon={<RiMoneyDollarCircleFill size={24} />}
          trend="+12.5%"
          color="text-emerald-600"
        />
        <StatCard
          title="Total Orders"
          value={stats?.totalOrders || 0}
          icon={<RiShoppingBag3Fill size={24} />}
          trend="+4.2%"
          color="text-blue-600"
        />
        <StatCard
          title="Inventory Items"
          value={stats?.productsCount || 0}
          icon={<RiTShirt2Fill size={24} />}
          trend="Live"
          color="text-amber-600"
        />
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-black text-xs uppercase tracking-widest text-gray-400">
              Order Velocity
            </h3>
            <span className="text-[10px] font-black bg-gray-50 px-3 py-1 rounded-full uppercase tracking-tighter">
              Last 7 Days
            </span>
          </div>
          <div className="h-[300px] flex items-center">
            <Line
              data={lineData}
              options={{
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
              }}
            />
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
          <h3 className="font-black text-xs uppercase tracking-widest text-gray-400 mb-8">
            Demographic Split
          </h3>
          <div className="h-[250px] flex items-center justify-center">
            <Doughnut
              data={doughnutData}
              options={{
                cutout: "75%",
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: { boxWidth: 8, font: { weight: "bold" } },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, trend, color }) => (
  <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
    <div className="flex justify-between items-start mb-6">
      <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#33211D] group-hover:bg-[#DA9F5B] group-hover:text-white transition-all duration-500">
        {icon}
      </div>
      <div
        className={`flex items-center text-[10px] font-black uppercase ${color}`}
      >
        <RiArrowUpSLine /> {trend}
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

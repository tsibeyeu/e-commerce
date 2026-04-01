import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Doughnut } from "react-chartjs-2";
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

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${backend_url}/api/admin/stats`, {
          headers: { token },
        });
        if (res.data?.success) setStats(res.data.stats);
        else setStats(null);
      } catch (err) {
        // fallback to mock data
        setStats(null);
      }
    };
    fetchStats();
  }, [token, backend_url]);

  const ordersData = stats?.ordersOverTime ?? {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    values: [5, 10, 7, 12, 8, 9, 14],
  };

  const revenueData = stats?.revenueByCategory ?? {
    labels: ["Clothing", "Accessories", "Shoes"],
    values: [1200, 800, 600],
  };

  const line = {
    labels: ordersData.labels,
    datasets: [
      {
        label: "Orders",
        data: ordersData.values,
        borderColor: "#111827",
        backgroundColor: "rgba(17,24,39,0.1)",
        tension: 0.3,
      },
    ],
  };

  const doughnut = {
    labels: revenueData.labels,
    datasets: [
      {
        data: revenueData.values,
        backgroundColor: ["#111827", "#6b7280", "#f59e0b"],
      },
    ],
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-medium mb-2">Orders (last 7 days)</h2>
          <Line data={line} />
        </div>

        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-medium mb-2">Revenue by category</h2>
          <Doughnut data={doughnut} />
        </div>
      </div>

      <div className="mt-6 bg-white shadow rounded p-4">
        <h3 className="font-medium mb-2">Quick stats</h3>
        <div className="flex gap-4">
          <div className="p-4 bg-gray-50 rounded flex-1">
            <div className="text-xs text-gray-500">Total Orders</div>
            <div className="text-2xl font-semibold">
              {stats?.totalOrders ?? 128}
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded flex-1">
            <div className="text-xs text-gray-500">Total Revenue</div>
            <div className="text-2xl font-semibold">
              ${stats?.totalRevenue ?? 3420}
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded flex-1">
            <div className="text-xs text-gray-500">Products</div>
            <div className="text-2xl font-semibold">
              {stats?.productsCount ?? 54}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

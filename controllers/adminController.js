import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";

export const getAdminStats = async (req, res) => {
  try {
    const totalOrders = await orderModel.countDocuments();
    const productsCount = await productModel.countDocuments();
    const allOrders = await orderModel.find({});

    const totalRevenue = allOrders.reduce(
      (acc, order) => acc + (order.amount || 0),
      0,
    );

    const recentOrders = await orderModel.find({}).sort({ date: -1 }).limit(5);

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const last7DaysLabels = [];
    const last7DaysValues = [0, 0, 0, 0, 0, 0, 0];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      last7DaysLabels.push(days[d.getDay()]);
    }

    allOrders.forEach((order) => {
      const orderDate = new Date(order.date).toDateString();
      for (let i = 0; i < 7; i++) {
        const checkDate = new Date();
        checkDate.setDate(checkDate.getDate() - (6 - i));
        if (orderDate === checkDate.toDateString()) {
          last7DaysValues[i]++;
        }
      }
    });

    const categories = ["Men", "Women", "Kids"];
    const categoryValues = await Promise.all(
      categories.map((cat) => productModel.countDocuments({ category: cat })),
    );

    res.json({
      success: true,
      stats: {
        totalOrders,
        totalRevenue,
        productsCount,
        recentOrders,
        revenueGrowth: "12.5",
        orderGrowth: "8.1",
        ordersOverTime: { labels: last7DaysLabels, values: last7DaysValues },
        revenueByCategory: { labels: categories, values: categoryValues },
      },
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.json({ success: false, message: error.message });
  }
};

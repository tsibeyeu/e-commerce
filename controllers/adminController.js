import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";

export const getAdminStats = async (req, res) => {
  try {
    // 1. Basic Counts
    const totalOrders = await orderModel.countDocuments();
    const productsCount = await productModel.countDocuments();

    // 2. Total Revenue (Sum of all orders)
    const allOrders = await orderModel.find({});
    const totalRevenue = allOrders.reduce(
      (acc, order) => acc + (order.amount || 0),
      0,
    );

    // 3. Orders Over Time (Last 7 Days)
    // We convert the 'date' Number into a Date object inside the query
    const ordersOverTime = await orderModel.aggregate([
      {
        $project: {
          convertedDate: { $toDate: "$date" }, // Converts your Number to Date
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%a", date: "$convertedDate" } }, // Mon, Tue, etc.
          count: { $sum: 1 },
        },
      },
    ]);

    // 4. Products by Category (For the Doughnut Chart)
    const revenueByCategory = await productModel.aggregate([
      {
        $group: {
          _id: "$category", // 'Men', 'Women', 'Kids'
          count: { $sum: 1 },
        },
      },
    ]);

    const stats = {
      totalOrders,
      totalRevenue,
      productsCount,
      ordersOverTime: {
        labels: ordersOverTime.map((item) => item._id),
        values: ordersOverTime.map((item) => item.count),
      },
      revenueByCategory: {
        labels: revenueByCategory.map((item) => item._id),
        values: revenueByCategory.map((item) => item.count),
      },
    };

    res.json({ success: true, stats });
  } catch (error) {
    console.log("Stats Error:", error);
    res.json({ success: false, message: error.message });
  }
};

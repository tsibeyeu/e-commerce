// import express from 'express'
// import cors from 'cors'
// import  'dotenv/config'
// import connectDB from './config/mongodb.js'
// import connectCloudinary from './config/cloudinary.js'
// import userRouter from './routes/userRoute.js'
// import productRouter from './routes/productRoute.js'
// import cartRouter from './routes/cartRoute.js'
// import orderRouter from './routes/orderRoute.js'

// // App Config
// const app = express()
// const port = process.env.PORT || 4000

// connectDB()
// connectCloudinary()

// // Middlewares
// app.use(express.json())
// app.use(cors())

// // API Endpoints
// app.use('/api/user',userRouter)
// app.use('/api/product',productRouter)
// app.use('/api/cart',cartRouter)
// app.use('/api/order',orderRouter)
// app.get('/', (req, res) => {
//   res.send('Hello from the backend!')
// })

// app.listen(port, () => {
//   console.log(`Server is running on port: ${port}`)
// })
// ...existing code...
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import adminRouter from "./routes/adminRoute.js";

// App Config
const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors());

// API Endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// If you want the URL to be /api/admin/stats, your prefix must be:
app.use("/api/admin", adminRouter);
app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

// start server only after successful connections
async function start() {
  try {
    await connectDB(); // ensure this returns the mongoose.connect Promise
    await connectCloudinary(); // ensure this returns a Promise or completes sync
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (err) {
    console.error("Startup error:", err.message || err);
    process.exit(1);
  }
}

start();

// graceful shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  process.exit(0);
});
// ...existing code...

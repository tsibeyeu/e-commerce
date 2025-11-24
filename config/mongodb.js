import mongoose from "mongoose";

const connectDB=async ()=>{

    mongoose.connection.on("connected",()=>{
        console.log("MongoDB connected successfully");
    })

    mongoose.connection.on("error",(err)=>{
        console.log("MongoDB connection failed", err);
    })

    await mongoose.connect(`${process.env.MONGODB_URL}/ecommerce-app`)
}

export default connectDB;
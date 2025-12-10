// import { currency } from "../../admin/src/App.jsx"
import orderModel from "../models/orderModel.js"
import UserModel from "../models/userModel.js"
import Stripe from "stripe"

//GLOBAL VARIBLES
const currency ='usd'
const deliveryCharge =10

// GET WAY INITIALIZE

const stripe =new Stripe(process.env.STRIPE_SECRET_KEY)

//PLACING ORDER USING COD METHOD
const placeOrder =async(req,res)=>{
    try {
        const {userId,items,amount,address}=req.body

        const orderData ={
            userId,
            items,
            amount,
            address,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()
        }
        const newOrder=orderModel(orderData)
        await newOrder.save()

        await UserModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success:true,message:"Order Placed}"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
        
    }
    
}
//PLACING ORDER USING STRIPE METHOD
const placeOrderStripe =async(req,res)=>{
    try {
        const {userId,items,amount,address}=req.body
        const {origin}=req.headers
          const orderData ={
            userId,
            items,
            amount,
            address,
            paymentMethod:"Stripe",
            payment:false,
            date:Date.now()
        }
         const newOrder=orderModel(orderData)
        await newOrder.save()

        const line_items =items.map((item)=>({
            price_data:{
                currency:currency,
                product_data:{
                    name:item.name

                },
                unit_amount:item.price * 100
            },
            quantity: item.quantity
        }))
        line_items.push({
             price_data:{
                currency:currency,
                product_data:{
                    name:'Delivery Charges'

                },
                unit_amount:deliveryCharge * 100
            },
            quantity: 1

        })

        const session =await stripe.checkout.sessions.create({
            success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode:'payment',
        })
        res.json({success:true,session_url:session.url})

        
    } catch (error) {
            console.log(error);
        res.json({success:false,message:error.message})
        
    }

}

// verify stripe

 const verifysStripe = async (req, res) => {
     const { orderId,success,userId } = req.body;
    try {
      if (success === 'true') {

         await orderModel.findByIdAndUpdate(orderId,{payment:true})
        await UserModel.findByIdAndUpdate(userId, { cartData: {} });
          res.json({ success: true });
      }else{
         await orderModel.findByIdAndDelete(orderId)
          res.json({ success:false });



      }

      // mark order as paid
    //   const order = await orderModel.findByIdAndUpdate(orderId, { payment: true }, { new: true });
    //   if (!order) return res.json({ success: false, message: "Order not found" });

      // clear user's cart (if order has userId)
    //   if (order.userId) {
    //     await UserModel.findByIdAndUpdate(order.userId, { cartData: {} });
    //   }

    //   res.json({ success: true, message: "Order verified", order });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
}
//ALL ORDERS FRO ADMIN PANEL
const allOrders =async(req,res)=>{
    try {
        const orders =await orderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
         console.log(error);
        res.json({success:false,message:error.message})
        
    }

}
//USER ORDER DATA FOR FRONTEND
const userOrders =async(req,res)=>{
    try {
        const {userId} =req.body
        const orders =await orderModel.find({userId})
        res.json({success:true,orders})
    } catch (error) {
         console.log(error);
        res.json({success:false,message:error.message})
        
    }

}
//UPDATE ORDER FROM ADMIN PANEL
const updateStatus =async(req,res)=>{
    try {
        const {orderId,status} =req.body
        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true,message:'Status Updated'})
    } catch (error) {
         console.log(error);
        res.json({success:false,message:error.message})
        
    }

}

export {verifysStripe,placeOrder,placeOrderStripe,allOrders,userOrders,updateStatus}
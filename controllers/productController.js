import {v2 as cloudinary} from "cloudinary"
import ProductModel from "../models/productModel.js";


//function for add product
export const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes,bestseller } = req.body;

        const image1=req.files.image1 && req.files.image1[0]
        const image2=req.files.image2 && req.files.image2[0]
        const image3=req.files.image3 && req.files.image3[0]
        const image4= req.files.image4 && req.files.image4[0]

        const images =[image1,image2,image3,image4].filter((item)=>item!==undefined)

        let imagesUrl=await Promise.all(
            images.map(async (item)=>{
                let result =await cloudinary.uploader.upload(item.path,{resource_type:'image'})
                return result.secure_url
            })
        )
        const productData={
            name,
            description,
            category,
            price:Number(price),
            subCategory,
            bestseller:bestseller === "true" ? true:false,
            sizes:JSON.parse(sizes),
            image:imagesUrl,
            date:Date.now()

        }
        console.log(productData);
        const product =new ProductModel(productData);
        await product.save()



        res.json({ success: true, message: "Product added successfully" });
        // const images = [];
        // if (req.files['image1']) images.push(req.files['image1'][0].path);
        // if (req.files['image2']) images.push(req.files['image2'][0].path);
        // if (req.files['image3']) images.push(req.files['image3'][0].path);
        // if (req.files['image4']) images.push(req.files['image4'][0].path);
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message:error.message });
    }};

    //fucntion for list products
export const listProducts = async (req, res) => {
    try {
        // const products = await ProductModel.find().sort({ date: -1 });
        const products = await ProductModel.find({});
        res.json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }};

    // function for removing product
export const removeProduct = async (req, res) => {
    try {
        await ProductModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Product removed successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }};

    // function for single product info 
export const singleProductInfo = async (req, res) => {
    try {
        const {productId}=req.body
        const product=await ProductModel.findById(productId)
        res.json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }};

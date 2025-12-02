import UserModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'7d',
    });

}

// user login controller
const loginUser=async (req,res)=>{
    try {
        const {email,password}=req.body

        const user=await UserModel.findOne({email});

        if (!user) {
            return res.json({success:false,message:"User doesn't exists"})
            
        }

        const isMatch=await bcrypt.compare(password,user.password);

        if (isMatch) {
            const token=createToken(user._id)
            res.json({success:true,token})
            
        }else{
            res.json({success:false,message:"Invalid credentials"})
        }
        
    } catch (error) {
                res.json({success:false,message:error.message})
        
    }

}

// user registration controller
const registerUser=async (req,res)=>{
   try {
    const {name,email,password}=req.body;
    // checking if user already exists

    const exists =await UserModel.findOne({email});
    if(exists){
        return res.status(400).json({success:false,message:"User already exists"})
    }

    // validating email and strong password
    if(!validator.isEmail(email)){
        return res.status(400).json({message:"Invalid email"})
    }
    if(password.length<8){
        return res.status(400).json({message:"Password must be at least 8 characters long"})
    }

    // hashing password
    const salt= await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(password,salt);
    // const hashedPassword=await bcrypt.hash(password,10);
    // creating new user
    const newUser=new UserModel({
        name,
        email,
        password:hashedPassword,
    });

    const user =await newUser.save() ;

    const token =createToken(user._id);

    res.json({ success:true,token})
    
   } catch (error) {
    console.error("Error in registerUser:", error);
    res.json({success:false,message:error.message})
    
   }
}


//Admin login controller
const adminLogin=async (req,res)=>{
    try {
        const {email,password}=req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token =jwt.sign(email + password,process.env.JWT_SECRET);
            return res.json({success:true,token})
        }else{
            res.json({success:false,message:"Invalid admin credentials"})
        }
        
    } catch (error) {
        res.json({success:false,message:error.message})
        
    }

}


export {loginUser, registerUser,adminLogin};
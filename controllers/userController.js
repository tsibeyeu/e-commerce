import UserModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// user login controller
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User doesn't exists" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// user registration controller
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // checking if user already exists

    const exists = await UserModel.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // validating email and strong password
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // const hashedPassword=await bcrypt.hash(password,10);
    // creating new user
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.json({ success: false, message: error.message });
  }
};

//Admin login controller
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      return res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid admin credentials" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    // prefer middleware-provided user id
    const userId = req.userId;
    // fallback: read token header and verify
    const token = req.headers.token;
    let id = userId;
    if (!id) {
      if (!token)
        return res.status(401).json({ success: false, message: "No token" });
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      id = decoded?.id || decoded?.userId || decoded?._id;
    }
    if (!id)
      return res.status(401).json({ success: false, message: "Invalid token" });

    const user = await UserModel.findById(id).select("-password");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res.json({ success: true, user });
  } catch (err) {
    console.error("getMe error", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
export const updateMe = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token)
      return res.status(401).json({ success: false, message: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded?.id || decoded?._id || decoded?.userId;
    if (!id)
      return res.status(401).json({ success: false, message: "Invalid token" });

    const updates = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.email) updates.email = req.body.email;

    // update and return sanitized user
    const user = await UserModel.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res.json({ success: true, user });
  } catch (error) {
    // duplicate email
    if (error.code === 11000)
      return res
        .status(400)
        .json({ success: false, message: "Email already in use" });
    console.error("updateMe error", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ...existing exports...

export const changePassword = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token)
      return res.status(401).json({ success: false, message: "No token" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded?.id || decoded?._id || decoded?.userId;
    if (!userId)
      return res.status(401).json({ success: false, message: "Invalid token" });

    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword)
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    if (newPassword.length < 6)
      return res
        .status(400)
        .json({ success: false, message: "Password too short" });

    const user = await UserModel.findById(userId).select("+password");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match)
      return res
        .status(401)
        .json({ success: false, message: "Old password is incorrect" });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.json({ success: true, message: "Password updated" });
  } catch (err) {
    console.error("changePassword error", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export { loginUser, registerUser, adminLogin };

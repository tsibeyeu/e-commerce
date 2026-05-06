import UserModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../config/nodemailer.js";
import crypto from "crypto"; // built-in Node.js — no install needed

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// user login controller
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
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
    const exists = await UserModel.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new UserModel({ name, email, password: hashedPassword });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.json({ success: false, message: error.message });
  }
};

// admin login controller
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // sign an object with role — much cleaner
      const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      return res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid admin credentials" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// GET /api/user/me — get current logged in user
export const getMe = async (req, res) => {
  try {
    // userId is now set by authUser middleware — no token reading needed here
    const userId = req.body.userId;
    const user = await UserModel.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/user/me — update name or email
export const updateMe = async (req, res) => {
  try {
    // userId is now set by authUser middleware
    const userId = req.body.userId;
    const updates = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.email) updates.email = req.body.email;
    const user = await UserModel.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    }).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ success: false, message: "Email already in use" });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/user/password — change password
export const changePassword = async (req, res) => {
  try {
    // userId is now set by authUser middleware
    const userId = req.body.userId;
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }
    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ success: false, message: "Password too short" });
    }
    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) {
      return res
        .status(401)
        .json({ success: false, message: "Old password is incorrect" });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ success: true, message: "Password updated" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// FORGOT PASSWORD — receives email, sends reset link
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      // don't reveal if email exists or not — security best practice
      return res.json({
        success: true,
        message: "If that email exists, a reset link has been sent",
      });
    }

    // generate a random token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // save token + expiry (30 minutes from now) to user
    user.resetToken = resetToken;
    user.resetTokenExpire = Date.now() + 30 * 60 * 1000; // 30 mins
    await user.save();

    // build the reset link — points to your React frontend
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    // send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset Request",
      html: `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <p>
          <a href="${resetLink}" style="color: #4CAF50; font-size: 16px;">${resetLink}</a>
        </p>
        <p>This link expires in <strong>30 minutes</strong>.</p>
        <p style="color: #999; font-size: 12px;">If you didn't request this, ignore this email.</p>
      </body>
    </html>
  `,
    });

    res.json({ success: true, message: "Reset link sent to your email" });
  } catch (err) {
    console.error("forgotPassword error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// RESET PASSWORD — receives token + new password
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    // find user with this token AND token not expired
    const user = await UserModel.findOne({
      resetToken: token,
      resetTokenExpire: { $gt: Date.now() }, // $gt = greater than = not expired
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset link" });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    // hash new password and save
    user.password = await bcrypt.hash(newPassword, 10);

    // clear the reset token so it can't be used again
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;

    await user.save();

    res.json({ success: true, message: "Password reset successfully" });
  } catch (err) {
    console.error("resetPassword error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export { loginUser, registerUser, adminLogin };

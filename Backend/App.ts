import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { verifyToken } from "./Middleware";


dotenv.config();

const app = express();
const port = process.env.PORT || 3003;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => {
    console.error("MongoDB connection failed ❌", err);
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
const addressSchema = new mongoose.Schema({
  address1: String,
  address2: String,
  city: String,
  stateCode: String,
  stateName: String,
  country: String,
  countrycode: String,
  countryNumber: String,
  zip: String,
  isDefault: { type: Boolean, default: false },
});

// const userSchema = new mongoose.Schema({
//   image: String,
//   firstName: String,
//   lastName: String,
//   email: String,
//   password: {
//     type: String,
//   },
//   phone: String,
//   countrycode: String,
//   countryNumber: String,
//   country: String,
//   stateCode: {
//     type: String,
//     uppercase: true,
//     trim: true,
//   },

//   stateName: {
//     type: String,
//     trim: true,
//   },
//   city: String,
//   address1: String,
//   address2: String,
//   role: {
//     type: String,
//     default: "User",
//   },
//   status: {
//     type: String,
//     default: "Active",
//   },
//   resetOtp: {
//     type: String,
//     default: null,
//   },

//   otpExpiry: {
//     type: Date,
//     default: null,
//   },
// });
const userSchema = new mongoose.Schema({
  image: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  phone: String,

  addresses: [addressSchema], 

  role: {
    type: String,
    default: "User",
  },
  status: {
    type: String,
    default: "Active",
  },
  resetOtp: String,
  otpExpiry: Date,
});

const User = mongoose.model("User", userSchema);

// API  for sigin 
app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      status: "Active",
      role: req.body.role || "User",
    });
    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      user,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err });
  }
});

//API for Login
app.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const query =
      identifier.includes("@") ? { email: identifier } : { phone: identifier };

    const user = await User.findOne(query);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.status !== "Active") {
      return res.status(403).json({
        message: "Your account is inactive or Banned",
      });
    }

    if (!user || !user.password) {
      return res.status(400).json({ message: "User not found or password missing" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      user,
      token,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err });
  }
});

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};


app.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = generateOTP();
    user.resetOtp = otp;
    user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();

    if (user.otpExpiry < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      html: `
    <div style="font-family: Arial, sans-serif; background:#f6f7fb; padding:40px;">
        <div style="max-width:500px; margin:auto; background:#ffffff; padding:30px; border-radius:12px; box-shadow:0 4px 20px rgba(0,0,0,0.08); text-align:center;">
            <h2 style="color:#333; margin-bottom:10px;">Password Reset Request</h2>
            <p style="color:#666; font-size:14px; margin-bottom:25px;">We received a request to reset your password. Use the OTP below to proceed.</p>
            <div style="font-size:28px; font-weight:bold; letter-spacing:6px; background:#f0f4ff; padding:15px 20px; border-radius:8px; display:inline-block; color:#2b59ff;">
                ${otp}
            </div>
            <p style="color:#999; font-size:12px; margin-top:25px;">This OTP is valid for <b>5 minutes</b>. Do not share it with anyone.</p>
            <hr style="margin:30px 0; border:none; border-top:1px solid #eee;" />
            <p style="font-size:12px; color:#aaa;">If you didn’t request this, you can safely ignore this email.</p>
        </div>
    </div>
    `,
    });

    return res.json({ message: "OTP sent successfully" });

  } catch (err: any) {
    console.error("🔥 SEND OTP ERROR:", err);
    return res.status(500).json({
      message: "Error sending OTP",
      error: err.message,
    });
  }
});

app.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.resetOtp || !user.otpExpiry) {
      return res.status(400).json({ message: "OTP not requested" });
    }

    if (user.resetOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiry < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    user.resetOtp = null;
    user.otpExpiry = null;
    await user.save();

    return res.json({ message: "OTP verified successfully" });

  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err });
  }
});

app.post("/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;
  await user.save();

  res.json({ message: "Password reset successful" });
});


// API endpoint to save user data
app.post("/data", async (req, res) => {
  try {
    const payload = {
      ...req.body,
      state: req.body.stateCode || req.body.state,
    };

    const user = new User(payload);
    await user.save();

    res.status(201).json({ message: "User saved successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving user", error: err });
  }
});

// API endpoint to get all users
// app.get("/data", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching users" });
//   }
// });

app.get("/data", async (req, res) => {
  try {
    const {
      page = "1",
      limit = "5",
      search = "",
      status,
      sortField = "firstName",
      sortOrder = "asc",
    } = req.query;

    const pageNum = Number(page);
    const limitNum = Number(limit);

    const query: any = {};

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    if (status) {
      query.status = new RegExp(`^${status}$`, "i");
    }
    const sortFieldStr = Array.isArray(sortField)
      ? sortField[0]
      : sortField;

    const allowedFields = ["firstName", "lastName", "email", "status", "role"];
    const safeSortField = allowedFields.includes(sortFieldStr as string)
      ? sortFieldStr
      : "firstName";

    const total = await User.countDocuments(query);
    const users = await User.find(query)
      .sort({ [safeSortField as string]: sortOrder === "asc" ? 1 : -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

      res.json({ data: users, total });
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err });
  }
});


// API get user by id 
app.get("/data/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "User not found" });
  }
});

// API delete the user
app.delete("/data/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err });
  }
});

// API update the user 
app.put("/data/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedUser = await User.findByIdAndUpdate(id, req.body, { returnDocument: 'after' });

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

// API for local storage
app.get("/me", verifyToken, async (req: any, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/add-address", verifyToken, async (req: any, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.addresses.push(req.body); 

    await user.save();

    res.json({
      message: "Address added",
      addresses: user.addresses,
    });

  } catch (err) {
    res.status(500).json({ message: "Error adding address" });
  }
});

app.get("/addresses", verifyToken, async (req: any, res) => {
  const user = await User.findById(req.user.id);

  res.json(user?.addresses || []);
});

app.get("/address/:id", verifyToken, async (req: any, res) => {
  try {
    const userId = req.user?.id;
    const addressId = req.params.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const address = user.addresses.id(addressId);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.json(address);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching address" });
  }
});

app.put("/address/:addressId", verifyToken, async (req: any, res) => {
  const { addressId } = req.params;

  const user = await User.findOneAndUpdate(
    { _id: req.user.id, "addresses._id": addressId },
    { $set: { "addresses.$": req.body } },
    { new: true }
  );

  res.json(user);
});

app.delete("/address/:addressId", verifyToken, async (req: any, res) => {
  const { addressId } = req.params;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $pull: { addresses: { _id: addressId } } },
    { new: true }
  );

  res.json({ message: "Address deleted", user });
});
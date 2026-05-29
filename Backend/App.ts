import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { verifyToken } from "./Middleware";
import path from "path";
import { upload } from "./upload";

dotenv.config();

const app = express();
const port = process.env.PORT || 3003;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => {
    console.error("MongoDB connection failed ❌", err);
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address1: String,
    address2: String,
    city: String,
    stateCode: String,
    stateName: String,
    country: String,
    countrycode: String,
    countryNumber: String,
    zip: String,
  },
);

const Address = mongoose.model("Address", addressSchema);

const userSchema = new mongoose.Schema({
  image: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  phone: String,

  resetOtp: String,
  otpExpiry: Date,

  role: { type: String, default: "User" },
  status: { type: String, default: "Active" },

  defaultAddressId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    default: null,
  },
});
const User = mongoose.model("User", userSchema);

const productSchema = new mongoose.Schema({
  imageName: String,
  productName: String,
  Productdescription: String,
  publish: String,
  productcode: String,
  quantity: String,
  colors: String,
  category: String,
  sizes: String,
  regularprice: String,
  saleprice: String,
  gender: String,
  tax: String,

  date: {
    type: String,
    default: () => new Date().toLocaleDateString(),
  },

  time: {
    type: String,
    default: () => new Date().toLocaleTimeString(),
  },
});
const Product = mongoose.model("Product", productSchema);

const OrderSchema = new mongoose.Schema({
  userId: String,

  orderNumber: {
    type: String,
    unique: true,
    sparse: true,
  },

  customerimage: String,
  customerName: String,
  email: String,
  phone: String,

  address: {
    address1: String,
    address2: String,
    city: String,
    state: String,
    country: String,
  },

  products: [
    {
      productId: String,
      productImage: String,
      category: String,
      productName: String,
      productCode: String,
      quantity: Number,
      price: Number,
      total: Number,
    },
  ],

  taxes: Number,
  discount: Number,
  total: Number,

  date: {
    type: String,
    default: () => new Date().toLocaleDateString(),
  },

  time: {
    type: String,
    default: () => new Date().toLocaleTimeString(),
  },
  status: {
    type: String,
    required: true,
  }
});
const Order = mongoose.model("Order", OrderSchema);

const CartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },

  customerimage: String,
  customerName: String,
  email: String,

  address: {
    address1: String,
    address2: String,
    city: String,
    state: String,
    country: String,
  },

  products: [
    {
      productId: String,
      productImage: String,
      category: String,
      productName: String,
      productCode: String,
      quantity: Number,
      price: Number,
      total: Number,
      selectedSizes: [String],
      selectedColors: [String],
    },
  ],


});

const Cart = mongoose.model("Cart", CartSchema);

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

    const user = new User(req.body);

    // if (user.addresses.length > 0) {
    //   user.defaultAddressId = user.addresses[0]._id;
    // }

    await user.save();

    res.status(201).json({
      message: "User saved successfully",
      user,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Error saving user",
      error: err,
    });
  }
});

// API endpoint to get all users
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
      .limit(limitNum)
      .lean();

    const userIds = users.map(u => u._id);

    const addresses = await Address.find({
      userId: { $in: userIds }
    }).lean();

    const result = users.map(user => {
      const userAddresses = addresses.filter(
        a => a.userId.toString() === user._id.toString()
      );

      const defaultAddress =
        userAddresses.find(
          a => a._id.toString() === user.defaultAddressId?.toString()
        ) || userAddresses[0] || null;

      return {
        ...user,
        defaultAddress,
      };
    });

    res.json({
      data: result,
      total,
    });

  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err });
  }
});

// API get user by id 

app.get("/data/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const addresses = await Address.find({ userId: user._id });

    res.json({
      ...user,
      addresses,
    });

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


app.post("/address", verifyToken, async (req: any, res) => {
  try {

    const { userId } = req.body;

    if (!userId) { return res.status(400).json({ message: "userId required", }); }

    const address = await Address.create({ ...req.body, userId, });

    const user = await User.findById(userId);

    if (!user) { return res.status(404).json({ message: "User not found", }); }

    if (!user.defaultAddressId) {
      user.defaultAddressId = address._id;
      await user.save();
    }

    return res.status(201).json({
      message: "Address created",
      address,
    });

  } catch (err: any) {

    console.error(err);

    return res.status(500).json({
      message: err.message,
    });
  }
});


// get all addresses list
app.get("/addresses", verifyToken, async (req: any, res) => {
  try {
    const addresses = await Address.find({ userId: req.user.id });

    const user = await User.findById(req.user.id);

    res.json({
      addresses,
      defaultAddressId: user?.defaultAddressId || null,
    });

  } catch (err) {
    res.status(500).json({ message: "Error fetching addresses" });
  }
});

// fetch single address by id 
app.get("/address/:id", verifyToken, async (req: any, res) => {
  try {
    const address = await Address.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.json(address);
  } catch (err) {
    res.status(500).json({ message: "Error fetching address" });
  }
});

// update address by id
app.put("/address/:id", verifyToken, async (req, res) => {
  const updated = await Address.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);
});

//delete the address
app.delete("/address/:id", verifyToken, async (req, res) => {
  await Address.findByIdAndDelete(req.params.id);

  res.json({ message: "Address deleted" });
});

//set the default in DB
app.put("/user/default-address/:addressId", verifyToken, async (req: any, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.defaultAddressId = req.params.addressId;
    await user.save();

    res.json({ message: "Default address updated" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// save the product in DB

app.post("/product", upload.single("image"), async (req, res) => {
  try {
    const product = new Product({
      ...req.body,
      imageName: req.file ? req.file.filename : null,
    });

    await product.save();

    res.status(201).json({
      message: "Product saved successfully",
      product,
    });
  } catch (err) {
    res.status(500).json({ message: "Error saving product", error: err });
  }
});

// get all products from DB 
app.get("/product", async (req, res) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Number(req.query.limit) || 10, 50);
    const search = String(req.query.search || "").trim();

    const query: any = {};


    if (search) {
      query.productName = {
        $regex: `^${search}`,
        $options: "i",
      };
    }

    const productsPromise = Product.find(query)
      .select(
        "imageName Productdescription category productName quantity regularprice saleprice publish date time"
      )
      .sort({ _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const totalPromise = Product.countDocuments(query);

    const [products, total] = await Promise.all([
      productsPromise,
      totalPromise,
    ]);

    return res.json({
      data: products,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Error fetching products",
    });
  }
});


// delete product from DB  
app.delete("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err });
  }
});

// get product by id 
app.get("/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }


    res.json({
      ...product,
    });

  } catch (err) {
    res.status(500).json({ message: "Product not found" });
  }
});

app.put("/product/:id", upload.single("image"), verifyToken, async (req, res) => {
  try {
    const updateData = {
      ...req.body,
    };

    if (req.file) {
      updateData.imageName = req.file.filename;
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({
      message: "Update failed",
      error: err,
    });
  }
}
);
const counterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, default: 0 },
});

const Counter = mongoose.model("Counter", counterSchema);

const generateOrderNumber = async () => {
  const counter = await Counter.findOneAndUpdate(
    { name: "order" },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );

  return `#${1000 + counter.value}`;
};
// API to create order
app.post("/order", async (req, res) => {
  try {
    const orderNumber = await generateOrderNumber();

    const order = new Order({
      ...req.body,
      orderNumber,
    });

    await order.save();

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (err: any) {
    console.error("ORDER ERROR:", err);

    res.status(500).json({
      message: "Error creating order",
      error: err.message,
    });
  }
});

// API to get orders list
app.get("/orders", async (req, res) => {
  try {

    const page = Math.max(Number(req.query.page) || 1, 1);

    const limit = Math.min(Number(req.query.limit) || 5, 50);

    const search = String(req.query.search || "").trim();

    const query: any = {};

    if (search) {

      const users = await User.find({
        $or: [
          {
            firstName: {
              $regex: search,
              $options: "i",
            },
          },
          {
            lastName: {
              $regex: search,
              $options: "i",
            },
          },
        ],
      }).select("_id");

      query.userId = {
        $in: users.map((u) => u._id),
      };
    }



    const total = await Order.countDocuments(query);

    const orders = await Order.find(query)
      .populate("userId")
      .populate("products.productId")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return res.json({
      data: orders,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Error fetching orders",
      error: err,
    });
  }
});


app.post("/cart", async (req, res) => {
  try {

    const { userId, products } = req.body;

    if (!userId) {
      return res.status(400).json({
        message: "userId is required"
      });
    }

    if (!products || !products.length) {
      return res.status(400).json({
        message: "products are required"
      });
    }

    let cart = await Cart.findOne({ userId });

    if (cart) {
      cart.products.push(products[0]);
      await cart.save();

      return res.status(200).json({
        message: "Product added to cart",
        cart,
      });
    }

    cart = new Cart(req.body);

    await cart.save();

    res.status(201).json({
      message: "Cart created",
      cart,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Cart error",
      error: err,
    });
  }
});
app.get("/cart/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({
      userId: req.params.userId,
    }).lean();

    if (!cart) {
      return res.json({
        products: [],
      });
    }

    res.json(cart);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Error fetching cart",
      error: err,
    });
  }
});

app.delete("/cart/:userId/:itemId", async (req, res) => {
  try {
    const { userId, itemId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    cart.products.pull({ _id: itemId });

    await cart.save();

    res.json({
      message: "Item removed from cart",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Error removing item from cart",
      error: err,
    });
  }
});

// Api To delete the oreder by id
app.delete("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err });
  }
});


// CLEAR USER CART
app.delete("/cart/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const deletedCart = await Cart.findOneAndDelete({ userId });

    if (!deletedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json({ message: "Cart cleared successfully" });
  } catch (err) {
    res.status(500).json({ message: "Clear cart failed", error: err });
  }
});
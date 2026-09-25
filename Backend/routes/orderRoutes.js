import express from "express";
import isAuth from "../middleware/isAuth.js";
import { placeOrder, getUserOrders, getAllOrders, createRazorpayOrder, verifyRazorpayPayment, updateOrderStatus } from "../controller/orderController.js";
import adminAuth from "../middleware/adminAuth.js";

const orderRoutes = express.Router();

orderRoutes.post("/place", isAuth, placeOrder);
orderRoutes.get("/myorders", isAuth, getUserOrders);
orderRoutes.get("/all", adminAuth, getAllOrders);
orderRoutes.post("/razorpay/create", isAuth, createRazorpayOrder);
orderRoutes.post("/razorpay/verify", isAuth, verifyRazorpayPayment);
orderRoutes.put("/status", adminAuth, updateOrderStatus);

export default orderRoutes;
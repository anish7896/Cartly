import Order from "../model/orderModel.js";
import User from "../model/userModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// COD
export const placeOrder = async (req, res) => {

    try {

        const { items, amount, address } = req.body;

        const userId = req.userId;

        const orderData = {

            items,
            amount,
            userId,
            address,

            paymentMethod: "COD",
            payment: false,

            status: "Order Placed",

            date: Date.now()
        };

        const newOrder = new Order(orderData);

        await newOrder.save();

        await User.findByIdAndUpdate(userId, {
            cartData: {}
        });

        res.status(200).json({
            success: true,
            message: "Order placed successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Order Place error"
        });

    }
};

// CREATE RAZORPAY ORDER
export const createRazorpayOrder = async (req, res) => {

    try {

        const { amount } = req.body;

        if (!amount) {
            return res.status(400).json({
                success: false,
                message: "Amount is required"
            });
        }

        const options = {
            amount: Math.round(amount * 100),
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        };

        const razorpayOrder = await razorpay.orders.create(options);

        res.status(200).json({
            success: true,
            order: razorpayOrder
        });

    } catch (error) {

        console.log("RAZORPAY CREATE ORDER ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Unable to create Razorpay order"
        });

    }
};

// VERIFY RAZORPAY PAYMENT AND CREATE OUR ORDER
export const verifyRazorpayPayment = async (req, res) => {

    try {

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            items,
            amount,
            address
        } = req.body;

        const userId = req.userId;

        const generatedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(
                razorpay_order_id + "|" + razorpay_payment_id
            )
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {

            return res.status(400).json({
                success: false,
                message: "Payment verification failed"
            });

        }

        const orderData = {

            items,
            amount,
            userId,
            address,

            paymentMethod: "Razorpay",
            payment: true,

            status: "Order Placed",

            date: Date.now()
        };

        const newOrder = new Order(orderData);

        await newOrder.save();

        await User.findByIdAndUpdate(userId, {
            cartData: {}
        });

        res.status(200).json({

            success: true,

            message: "Payment successful and order placed",

            order: newOrder

        });

    } catch (error) {

        console.log("RAZORPAY VERIFY ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Payment verification error"
        });

    }
};

export const getUserOrders = async (req, res) => {

    try {

        const userId = req.userId;

        const orders = await Order.find({ userId });

        res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Get orders error"
        });
    }
};

export const getAllOrders = async (req, res) => {

    try {

        const orders = await Order.find({});

        res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Get all orders error"
        });
    }
};


export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        const allowedStatuses = [
            "Order Placed",
            "Packing",
            "Shipped",
            "Out for Delivery",
            "Delivered",
            "Cancelled"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order status"
            });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Order status updated",
            order: updatedOrder
        });

    } catch (error) {
        console.log("UPDATE STATUS ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Unable to update order status"
        });
    }
};

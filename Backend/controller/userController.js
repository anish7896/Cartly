import User from "../model/userModel.js";


export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getAdmin = async (req, res) => {
    try {
        const adminEmail = req.adminEmail;
        if(!adminEmail){
            return res.status(404).json({message:"Admin is not found"});
        }
        res.status(200).json({
            email: adminEmail,
            role: "admin"
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const addToCart = async (req, res) => {
    try {
        const userId = req.userId;
        const { productId, size } = req.body;

        if (!productId || !size) {
            return res.status(400).json({
                message: "Product and size are required"
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (!user.cartData) {
            user.cartData = {};
        }

        if (!user.cartData[productId]) {
            user.cartData[productId] = {};
        }

        if (!user.cartData[productId][size]) {
            user.cartData[productId][size] = 1;
        } else {
            user.cartData[productId][size] += 1;
        }

        user.markModified("cartData");

        await user.save();

        res.status(200).json({
            message: "Product added to cart",
            cartData: user.cartData
        });

    } catch (error) {
        console.log("ADD TO CART ERROR:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const getCart = async (req, res) => {
    try {

        const userId = req.userId;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            cartData: user.cartData
        });

    } catch (error) {

        console.log("GET CART ERROR:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};


export const updateCart = async (req, res) => {
    try {

        const userId = req.userId;
        const { productId, size, quantity } = req.body;

        if (!productId || !size || quantity === undefined) {
            return res.status(400).json({
                message: "Product, size and quantity are required"
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (!user.cartData) {
            user.cartData = {};
        }

        if (!user.cartData[productId]) {
            return res.status(404).json({
                message: "Product not found in cart"
            });
        }

        if (quantity <= 0) {

            delete user.cartData[productId][size];

            if (
                Object.keys(user.cartData[productId]).length === 0
            ) {
                delete user.cartData[productId];
            }

        } else {

            user.cartData[productId][size] = quantity;

        }

        user.markModified("cartData");

        await user.save();

        res.status(200).json({
            message: "Cart updated",
            cartData: user.cartData
        });

    } catch (error) {

        console.log("UPDATE CART ERROR:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const removeFromCart = async (req, res) => {
    try {

        const userId = req.userId;
        const { productId, size } = req.body;

        if (!productId || !size) {
            return res.status(400).json({
                message: "Product and size are required"
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (
            user.cartData &&
            user.cartData[productId]
        ) {

            delete user.cartData[productId][size];

            if (
                Object.keys(user.cartData[productId]).length === 0
            ) {
                delete user.cartData[productId];
            }

        }

        user.markModified("cartData");

        await user.save();

        res.status(200).json({
            message: "Product removed from cart",
            cartData: user.cartData
        });

    } catch (error) {

        console.log("REMOVE CART ERROR:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};

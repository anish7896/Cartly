import User from "../model/userModel.js";
import validator from "validator";
import generateToken from "../config/token.js";
import bcrypt from "bcryptjs";
import generateAdminToken from "../config/token.js";

export const register = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                message: "Please fill all the fields"
            });
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({
                message: "Please enter a valid email"
            });
        }
        if(!validator.isLength(password, {min: 6})){
            return res.status(400).json({
                message: "Password must be at least 6 characters long"
            });
        }
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({
                message: "User already exists"
            });
        }
        let hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name, 
            email, 
            password: hashedPassword
        });
        const token = generateToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        res.status(201).json({
            message: "User registered successfully", 
            user: {name: user.name, email: user.email, _id: user._id, cartData: user.cartData}
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please enter email and password"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User doesn't exist"
            });
        }

        // Google account
        if (!user.password) {
            return res.status(400).json({
                message: "This account was created using Google. Please login with Google."
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid password"
            });
        }

        const token = generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                cartData: user.cartData
            }
        });

    } catch (error) {

        console.error("LOGIN ERROR:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "strict"
    });

    res.status(200).json({
        message: "Logout successful"
    });
};

export const googleLogin = async (req, res) => {
    try {
        const { name, email } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                name,
                email
            });
        }

        const token = generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: "Google login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                cartData: user.cartData
            }
        });

    } catch (error) {

        console.error("GOOGLE LOGIN ERROR:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
         if(!email || !password){
            return res.status(400).json({message: "Please fill all the fields"});
        }
        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
            return res.status(401).json({message: "Invalid email or password"});
        }
        const token = generateAdminToken(email);
        res.cookie("adminToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.status(200).json(token);
    } catch (error) {
        console.error("ADMIN LOGIN ERROR:", error);
        res.status(500).json({message: "Admin login error"});
    }
};

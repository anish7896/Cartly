import express from "express";
import isAuth from "../middleware/isAuth.js";
import { getAdmin, getCurrentUser, addToCart, getCart, updateCart, removeFromCart } from "../controller/userController.js";
import adminAuth from "../middleware/adminAuth.js";
import { adminLogin } from "../controller/authController.js";

const userRoutes = express.Router();


userRoutes.get("/getuser", isAuth, getCurrentUser)
userRoutes.get("/getadmin", adminAuth, getAdmin)
userRoutes.post("/addcart", isAuth, addToCart);
userRoutes.get("/cart", isAuth, getCart);
userRoutes.post("/updatecart", isAuth, updateCart);
userRoutes.post("/removefromcart", isAuth, removeFromCart);

export default userRoutes;
import express from "express";
import { register} from "../controller/authController.js";
import {login} from "../controller/authController.js";
import {logout} from "../controller/authController.js";
import {googleLogin} from "../controller/authController.js";
import {adminLogin} from "../controller/authController.js";
const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.get("/logout", logout);
authRoutes.post("/googlelogin", googleLogin);

authRoutes.post("/adminlogin", adminLogin);


export default authRoutes; 
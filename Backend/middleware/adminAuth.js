import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
    try {
        const token = req.cookies.adminToken;

        if (!token) {
            return res.status(400).json({
                message: "Access denied. No token provided."
            });
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        if(!verifyToken){
            return res.status(401).json({
                message: "Invalid token."
            });
        }
        req.adminEmail = process.env.ADMIN_EMAIL;
        next();
    } catch (error) {
        console.error("ADMIN AUTH ERROR:", error);
        return res.status(500).json({message:`isAuth error ${error}`})
    }

    
};

export default adminAuth;
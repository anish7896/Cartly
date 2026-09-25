import jwt from "jsonwebtoken";




const isAuth = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }
    try {
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = verifyToken.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token." });
    }
};

export default isAuth;

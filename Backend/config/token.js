import jwt from "jsonwebtoken";

const generateToken = (id) => {
    return jwt.sign(
        { userId: id },
        process.env.JWT_SECRET,
        { expiresIn: "7d"}
    );
};

export const generateAdminToken = (email) => {
    try {
        const token = jwt.sign(
            { email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        return token;
    } catch (error) {
        console.error("Error generating admin token:", error);
        throw new Error("Failed to generate admin token");
    }
};

export default generateToken;
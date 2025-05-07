import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
configDotenv();

export const isAuthenticated = async (req, res, next) => {
    const token = req.header("Authorization");
    // console.log(token);
    
    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log(decoded);
        
        req.user = decoded;
        
        next();
    } catch (error) {

        res.status(401).json({ message: "Invalid token", error: error });
    }
}
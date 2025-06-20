import { JWT_SECRET } from "../config/env.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authorize = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            const error = new Error('Unauthorized: No token provided');
            error.statusCode = 401;
            throw error;
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        // Correct key: decoded.userid (not userId)
        const user = await User.findById(decoded.userid); 
        if (!user) {
            const error = new Error('Unauthorized: User not found');
            error.statusCode = 401;
            throw error;
        }

        req.user = user; // attach user to request
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Unauthorized",
            error: error.message
        });
    }
}

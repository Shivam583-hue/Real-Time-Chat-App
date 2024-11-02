import jwt from "jsonwebtoken";
import express, { Request, Response, NextFunction } from "express";
import User from "../models/user.model.js";


declare global {
    namespace Express {
        interface Request {
            user?: any ; 
        }
    }
}

interface JwtPayload {
    userId: string; 
}

const protectRoute = (async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt;
        
        if (!token) {
            return res.status(401).json({ error: "Unauthorised - No Token Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorised - Invalid Token" });
        }

        const user = await User.findById(decoded.userId).select("-password");
        
        if (!user) {
            return res.status(404).json({ error: "User Not Found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}) as express.RequestHandler;

export default protectRoute;
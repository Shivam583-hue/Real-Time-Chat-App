import express,{ Request,Response,RequestHandler } from "express"
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = (async(req:Request,res:Response) => {
    try {
        const {fullName,username,password,confirmPassword,gender,profilePic} = req.body;
        if(password != confirmPassword){
            return res.status(400).json({error : "Passwords don't match"})
        }
        const user = await User.findOne({username})
        if(user){return res.status(400).json({error : "User already exists"})}

        //hash password  
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            fullName,
            username,
            password : hashedPassword,
            gender,
            profilePic: profilePic,
        })

        await newUser.save()
        generateTokenAndSetCookie(newUser._id,res)
        res.status(201).json({
            _id:newUser._id,
            fullName: newUser.fullName,
            username : newUser.username,
            gender: newUser.gender,
            profilePic : newUser.profilePic
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({error : "Internal server error"})
    }
})as express.RequestHandler


export const login = (async(req:Request,res:Response) => {
    try {
        const {username,password} = req.body;
        const user = await User.findOne({username:username})

        if(!user){
            res.json({Error: "user not found in database please sign up"})
        }

        const isPasswordCorrect = await bcrypt.compare(password,user?.password || "")

        if(!isPasswordCorrect){
            res.json({Error :" incorrect password"})
        }
        generateTokenAndSetCookie(user?._id,res);
        res.status(200).json({
            _id : user?._id,
            fullName : user?.fullName,
            username : user?.username,
            profilePic: user?.profilePic
        })
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error : "Internal server error"})
    }
})as express.RequestHandler

export const logout = (async(req:Request,res:Response) => {
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message : "logged out successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({error : "Internal server error"})
    }
} )as express.RequestHandler
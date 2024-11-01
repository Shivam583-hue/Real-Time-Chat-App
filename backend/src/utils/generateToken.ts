import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const generateTokenAndSetCookie = (userId:any,res:any) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'15d'})
    res.cookie('jwt',token,{
        maxAge :  15 * 24 * 60 * 60 * 1000,
        httpOnly:true, //prevents XSS attacks
        sameSite: "lax",
        secure: process.env.NODE_ENV != "development"
    })
}
export default generateTokenAndSetCookie
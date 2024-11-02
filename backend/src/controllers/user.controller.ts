import express,{Request,Response} from "express"
import User from "../models/user.model.js"


export const getUsersForSiderbar = (async(req:Request,res:Response) => {
    try {
        const loggedInUserId = req.user._id
        const filteredUsers =  await User.find({_id: { $ne:loggedInUserId}}).select("-password")
        res.status(200).json(filteredUsers)
    } catch (error:any) {
        console.error("Error in gettingUsersSidbar",error.message)
        res.json({error:"Internal server error"})
    }
})as express.RequestHandler
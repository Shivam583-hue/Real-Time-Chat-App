import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const connecttoDb = async() => {
    try {
        await mongoose.connect(process.env.MONOGO_DB_URL)
        console.log("Connected to mongoDB")
    } catch (error) {
        console.log("Error connecting to mongoDb",error)
    }
}
export default connecttoDb
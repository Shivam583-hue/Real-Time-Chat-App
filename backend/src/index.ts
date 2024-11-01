import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route"
import messageRoutes from "./routes/message.route"
import userRoutes from "./routes/user.route"
import connecttoDb from "./db/connectFile"
import cookieParser from "cookie-parser"
dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/users",userRoutes)

// app.get('/',(req,res)=> {
//     res.send("Server is running")
// })


app.listen(PORT, () => {
    connecttoDb()
    console.log(`Server Running on port ${PORT} `)
})
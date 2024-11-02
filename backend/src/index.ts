
import path from "path"
import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import userRoutes from "./routes/user.route.js"
import connecttoDb from "./db/connectFile.js"
import cookieParser from "cookie-parser"
import { app, server } from "./socket/socket.js"
dotenv.config()


const PORT = process.env.PORT

const __dirname = path.resolve()

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/users",userRoutes)
app.use(express.static(path.join(__dirname,"frontend/dist")))

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))x
})

// app.get('/',(req,res)=> {
//     res.send("Server is running")
// })


server.listen(PORT, () => {
    connecttoDb()
    console.log(`Server Running on port ${PORT} `)
})
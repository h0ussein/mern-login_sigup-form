import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import conn from "../config/db.js"
import AuthRouter from "../src/routes/AuthRouter.js"


dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080

app.get("/" ,(req,res)=>{
    res.send("biso kabiso")
})

app.use(cors())
app.use(bodyParser.json())
app.use("/auth", AuthRouter)


app.listen(PORT, () =>{
    console.log(`server is running on port ${PORT}`)
})

conn();

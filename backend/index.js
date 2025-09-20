import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"

dotenv.config()



const app = express()
const PORT = process.env.PORT || 8080

app.get("/" ,(req,res)=>{
    res.send("biso kabiso")
})

app.use(cors())
app.use(bodyParser.json())


app.listen(PORT, () =>{
    console.log(`server is running on port ${PORT}`)
})

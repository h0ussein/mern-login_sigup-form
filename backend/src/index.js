import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";

import conn from "../config/db.js"
import AuthRouter from "../src/routes/AuthRouter.js"


dotenv.config();

const app = express()
const PORT = process.env.PORT || 5001
const __dirname = path.resolve()


if(process.env.NODE_ENV !== "production"){
  app.use(cors({
    origin: "http://localhost:5173"
  }))
}
app.use(express.json());
app.use(bodyParser.json());
app.use("/api/auth", AuthRouter);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
  console.log(express.static(path.join(__dirname, "../frontend/dist")))

  app.use( (req, res) => {
    res.sendFile(path.join(__dirname,"/frontend","dist","index.html"));
  });
  //C:\Users\MM2\Desktop\login-signup project\frontend\dist\index.html
}

conn().then( () => {
app.listen(PORT, () =>{
    console.log(`server is running on port ${PORT}`)
});
});




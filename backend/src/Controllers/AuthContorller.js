import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import UserModel from "../models/User.js"

const signup = async (req, res) => {
    try {
        const {name , email, password} = req.body
        const user = await UserModel.findOne({email})
        if(user){
            return res.status(409).json({message: "user already exists, you can login", success: false})
        }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new UserModel({name,email, password: hashedPassword, plainPassword: password})
    await newUser.save();
    res.status(201).json({message: "user created successfully", success: true})
   
    } catch (error) {
        console.error("sigup error",error)
        res.status(500).json({message: "internal server error", success: false})
    
    }

}

const login = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await UserModel.findOne({email})
        const errormsg = "invalid email or password"

        if(!user){
            return res.status(409).json({message: errormsg, success: false})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.status(409).json({message: errormsg, success: false})
        }
        const token = jwt.sign(
            {email: user.email, _id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        )

        res.status(200).json({
            message: "login success",
            success: true,
            token,
            email,
            name: user.name
                    
        })
   
    } catch (error) {
        console.error("login error",error)
        res.status(500).json({message: "internal server error", success: false})
    
    }

}


export  {signup, login}
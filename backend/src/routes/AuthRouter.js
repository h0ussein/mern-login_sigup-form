import express from "express"
import { signup, login } from "../Controllers/AuthContorller.js"
import { signupValidation, loginValidation } from "../middleware/AuthValidation.js"

const router = express.Router()

router.post("/signup", signupValidation, signup)
router.post("/login", loginValidation, login)


export default router;
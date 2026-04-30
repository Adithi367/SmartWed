import { register,login,resetPassword,getProfile } from "../controller/authController.js";
import express from "express";
import authUser from "../middleware/authUser.js";
const router=express.Router();
router.post('/register',register);
router.post('/login',login);
router.post('/resetpassword',resetPassword)
router.get('/profile',authUser,getProfile)
export default router;
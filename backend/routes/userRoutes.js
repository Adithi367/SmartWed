import { createUser } from "../controller/userController.js";
import express from 'express';
const router=express.Router();
router.post('/create',createUser);
export default router;
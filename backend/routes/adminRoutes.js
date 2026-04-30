import express from "express";
import { getAdminDashboard,getAllBookingsAdmin,getAllFeedback } from "../controller/adminController.js";
import  authAdmin  from "../middleware/authAdmin.js";
const router = express.Router();
router.get("/dashboard", authAdmin, getAdminDashboard);
router.get("/bookings", authAdmin, getAllBookingsAdmin);
router.get('/allFeedback',authAdmin,getAllFeedback)
export default router;
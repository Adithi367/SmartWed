import { createBooking,getBookings,updateBookingStatus,getAllBookings ,checkBookingStatus, generateBill, updateCharges,checkServiceBookingStatus} from "../controller/bookingController.js";
import express from "express";
import authAdmin from "../middleware/authAdmin.js"
import authUser from "../middleware/authUser.js";
const router=express.Router()
router.post('/createBooking/:vendorId',authUser,createBooking)
router.get('/getBookings',authUser,getBookings)
router.get('/getAllBookings',authAdmin,getAllBookings)
router.put('/updateBookings/:bookingId',authAdmin,updateBookingStatus)
router.get('/checkStatus/:vendorId',authUser,checkBookingStatus)
router.get('/checkServiceBookingStatus/:service',authUser,checkServiceBookingStatus)
router.get('/generateBill',authUser,generateBill)
router.put('/updateCharges/:bookingId',authAdmin,updateCharges)
export default router 
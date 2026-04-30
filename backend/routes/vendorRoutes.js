import { addReview, createVendor ,getVendor, getVendorById} from "../controller/vendorController.js";
import express from 'express'
import  authUser from "../middleware/authUser.js";
const router=express.Router()
router.post('/createVendor',createVendor)
router.get('/getVendor',getVendor)
router.get('/getVendorById/:id',getVendorById)
router.post('/addReview/:vendorId',authUser,addReview)
export default router
import { createPlan,getPlan } from "../controller/planController.js";
import express from 'express'
import authUser from './../middleware/authUser.js'
const router=express.Router()
router.post('/createPlan',authUser,createPlan)
router.get('/getPlan',authUser,getPlan)
export default router
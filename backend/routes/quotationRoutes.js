import express from 'express'
// import { requestQuotation,getMyQuotations,getAllQuotations,updateQuotationStatus } from '../controller/quotationController.js'
import { generateQuotation,getAllGeneratedQuotations,getMyGeneratedQuotations } from '../controller/generateQuotation.js'
import authAdmin from '../middleware/authAdmin.js'
import authUser from '../middleware/authUser.js'
const router=express.Router()
// router.post('/request',authUser,requestQuotation)
// router.get("/myQuotations", authUser, getMyQuotations);
// router.get("/allQuotations", authAdmin, getAllQuotations);
// router.put("/updateQuotation/:id", authAdmin, updateQuotationStatus);

router.post('/generate',authUser,generateQuotation)
router.get('/myquotation',authUser,getMyGeneratedQuotations)
router.get('/allquotation',authAdmin,getAllGeneratedQuotations)
export default router
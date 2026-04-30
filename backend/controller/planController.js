import Plan from "../models/budgetPlanner.js";
export const createPlan=async(req,res)=>{
    try {
        const { amount,guests,location,services }=req.body;
        const userId=req.user.id;
        const plan=await Plan.create({
            amount,
            guests,
            location,
            services,
            userId
        })
        return res.status(201).json({
            success:true,
            message:"Plan Created Successfully",
            data:plan
        })

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal Server error"
        })
    }
}
export const getPlan=async(req,res)=>{
    try {
        const userId=req.user.id;
        const plan=await Plan.findOne({userId});
        if(!plan){
            return res.status(200).json({   
                success:false,
                message:"Plan not found"
            })
        }   
        return res.status(200).json({
            success:true,
            data:plan
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal Server error"
        })
    }   
}
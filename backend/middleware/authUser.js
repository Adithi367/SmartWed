import express from "express"
import jwt from "jsonwebtoken"
const authUser=(req,res,next)=>{
    try{
         const token=req.header("auth")
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Unauthorized"
        })
    }   
    const decoded=jwt.verify(token,process.env.SECRET_KEY)
    req.user=decoded
    next()
    }
    catch(error){
        console.log(error)
        res.status(401).json({
            success:false,
            message:"Invalid token"
        })
    }

   
}
export default authUser
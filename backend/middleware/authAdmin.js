import express from "express"
import jwt from "jsonwebtoken"
const authAdmin=(req,res,next)=>{
    try{
         const token=req.header("auth")
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Unauthorized"
        })
    }   
    const decoded=jwt.verify(token,process.env.SECRET_KEY)
    if(decoded.role!=="admin"){
        return res.status(403).json({
            success:false,
            message:"Access Denied. Admin Only!"
        })
    }
    
    req.admin=decoded
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
export default authAdmin
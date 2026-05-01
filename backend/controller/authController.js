import User from "../models/userSchema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const register=async(req,res)=>{
    try {
        const {username,useremail,userphone,userpassword}=req.body;
         if(!username || !useremail || !userphone || !userpassword){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const user=await User.findOne({
            email: useremail
        })
        if(user)
        {
            return res.status(400).json({
                success:false,
                message:'User already exists'
            })
           
        }
        const hashedPassword=await bcrypt.hash(userpassword,10);
        const newUser=await User.create({
            name:username,
            email:useremail,
            phone:userphone,
            password:hashedPassword
        })
        res.status(201).json({
            success:true,
            message:'User created successfully',
            user:newUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:error
        })
    }
}
export const resetPassword=async(req,res)=>{
    try {
        const {email,newPassword}=req.body;
        if(!email || !newPassword){
            return res.status(400).json({
                success:false,
                message:"Email and new password are required"
            })
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:'User not found'
            })
        }
        const hashedPassword=await bcrypt.hash(newPassword,10);
        user.password=hashedPassword;
        await user.save();
        return res.status(200).json({
            success:true,
            message:'Password reset Successfull'
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
export const login=async(req,res)=>{
    try {

        const {useremail,userpassword}=req.body;
        if(!useremail||!userpassword){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        const user=await User.findOne({
            email:useremail
        })
        if(user){
            const isPasswordMatch=await bcrypt.compare(userpassword,user.password);
            if(isPasswordMatch){
                console.log(process.env.SECRET_KEY)
                const token=jwt.sign({id:user._id,role:user.role},process.env.SECRET_KEY,{expiresIn:'7d'})
                return res.status(200).json({
                    success:true,
                    message:"Login successful",
                    user:user,
                    token:token
                })
            }
            else{
                return res.status(400).json({
                    success:false,
                    message:"Invalid credentials"
                })
            }
        }
        else{
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:error
        })
    }
}
export const getProfile=async(req,res)=>{
    try {
        const user=await User.findById(req.user.id).select('-password')
        return res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
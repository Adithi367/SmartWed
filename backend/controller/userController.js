import User from '../models/userSchema.js';
export const createUser=async(req,res)=>{
    try {
        const {username,useremail,userphone,userpassword}=req.body;
        const user=await User.create({
            name:username,
            email:useremail,
            phone:userphone,
            password:userpassword
        });
        res.status(201).json({
            success:true,
            message:'User created successfully',
            user:user
        })
        console.log(user)
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error,
            
        })
    }
}
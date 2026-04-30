import Vendor from "../models/vendorSchema.js";
import User from '../models/userSchema.js'
export const createVendor=async(req,res)=>{
    try {
        const vdata=req.body;
        const vendor=await Vendor.create(
            vdata 

        )
        return res.status(201).json({
            success:true,
            message:"Vendor created Successfully",
            data: vendor
            
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Invalid Server Error"
            
        })
    }
    
}
export const getVendor=async(req,res)=>{
    try {
        const { service, budget, location } = req.query;
        let filter={}
        if(service && service!=='All'){
            filter.service=service;
        }
        if(location){
            filter.location=location;
        }
        if(budget){
            filter.price={$lte:Number(budget)}
       }
       const vendors=await Vendor.find(filter)
       
   

    return res.status(200).json({
      success: true,
      vendors: vendors
    });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Invalid Server Error"
            
        })
    }
}
export const getVendorById=async(req,res)=>{
    try {
        const {id}=req.params;
        const vendor=await Vendor.findById(id);
        if(!vendor){
            return res.status(404).json({
                success:false,
                message:"Vendor not found"
            })
        }
        return res.status(200).json({
            success:true,
            vendor
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
export const getAllVendors=async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}
export const addReview=async(req,res)=>{
    try {
        const {vendorId}=req.params;
        const { rating, comment } = req.body;
        const userId=req.user.id;
        const user=await User.findById(userId)
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        
        const customerName=user.name;
        const vendor=await Vendor.findById(vendorId);
        if(!vendor){
            return res.status(404).json({
                success:false,
                message:"Vendor not found"
            })
        }
        const alreadyReviewed=vendor.reviews.find(
            (review)=>review.userId.toString()===userId
        )
        
        if(alreadyReviewed){
            return res.json({
                success:false,
                message:"You have already reviewed this vendor"
            })
        }
        const numericRating=Number(rating);
        vendor.reviews.push({
            userId,
            customerName,
            rating: numericRating,
            comment
        })
        vendor.totalRatings=vendor.reviews.length;

        const totalRatingValue=vendor.reviews.reduce(
            (acc,review)=>acc+review.rating,0
        )
        vendor.rating = (totalRatingValue / vendor.totalRatings).toFixed(1);
        await vendor.save();
        return res.status(200).json({
            success:true,
            message:"Feedback Submitted successfully",
            reviews:vendor.reviews,
            averageRating:vendor.rating
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
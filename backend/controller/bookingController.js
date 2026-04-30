import Booking from "../models/bookingSchema.js";
import Vendor from "../models/vendorSchema.js";
import User from '../models/userSchema.js'
import GenerateQuotation from '../models/generatedQuotationSchema.js'

export const createBooking = async (req, res) => {
  try {
    const vendorId = req.params.vendorId;
    const { message, quotationId, bookingMode, planId } = req.body;
    const customerId = req.user.id;

    const user = await User.findById(customerId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let bookingData = {
      vendorId,
      customerId,
      customerName: user.name,
      customerEmail: user.email,
      customerPhone: user.phone,
      message: message || "",
      bookingMode,
    };

   
    if (bookingMode === "PLANNED") {
      if (!quotationId) {
        return res.status(400).json({
          success: false,
          message: "Quotation required for planned booking",
        });
      }

      const quotation = await GenerateQuotation.findById(quotationId);

      if (!quotation) {
        return res.status(404).json({
          success: false,
          message: "Quotation not found",
        });
      }

      if (quotation.customerId.toString() !== customerId) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized",
        });
      }

      bookingData = {
        ...bookingData,
        quotationId: quotation._id,
        vendorPriceAtBooking: quotation.vendorPrice,
        discount: quotation.discount,
        extraCharges: quotation.extraCharges,
        finalPrice: quotation.finalPrice,
      };
    }

    
    if (bookingMode === "DIRECT") {
      const vendor = await Vendor.findById(vendorId);

      if (!vendor) {
        return res.status(404).json({
          success: false,
          message: "Vendor not found",
        });
      }

      bookingData = {
        ...bookingData,
        vendorPriceAtBooking: vendor.price,
        discount: 0,
        extraCharges: 0,
        finalPrice: vendor.price,
      };
    }

    const booking = await Booking.create(bookingData);

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const getBookings=async(req,res)=>{
    try {
        const customerId=req.user.id;
        const bookings=await Booking.find({ customerId }).populate("vendorId").sort({ createdAt: -1 });
        return res.status(200).json({
            success:true,
            message:"Bookings fetched Successfully!",
            data:bookings
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
export const getAllBookings=async(req,res)=>{
    try {
        const bookings=await Booking.find().populate("vendorId").sort({ createdAt: -1 });
        return res.status(200).json({
            success:true,
            message:"All bookings fetched Successfully!",
            data:bookings
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
export const updateBookingStatus=async(req,res)=>{
    try {
        const bookingId=req.params.bookingId;
        const {status}=req.body;
        if(!bookingId||!status){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        if (!["pending", "accepted", "rejected"].includes(status)) {
            return res.status(400).json({
            success: false,
            message: "Invalid status value",
            });
        }

        const booking=await Booking.findByIdAndUpdate(bookingId,{status},{new:true});
        if(!booking){
            return res.status(404).json({       
                success:false,
                message:"Booking not found"
            })
        }
      
        return res.status(200).json({
            success:true,
            message:"Booking status updated Successfully!",
            data:booking
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

export const checkBookingStatus = async (req, res) => {
  try {
    res.set("Cache-Control", "no-store");

    const customerId = req.user.id;
    const { vendorId } = req.params;

    //const booking = await Booking.findOne({ customerId, vendorId }).sort({ createdAt: -1 });
    let booking = await Booking.findOne({
      customerId,
      vendorId,
      status: "accepted"
    });

    if (!booking) {
      booking = await Booking.findOne({
        customerId,
        vendorId,
        status: "pending"
      }).sort({ createdAt: -1 });
    }

    if (!booking) {
      booking = await Booking.findOne({
        customerId,
        vendorId,
        status: "rejected"
      }).sort({ createdAt: -1 });
    }
    if (!booking) {
      return res.status(200).json({
        success: true,
        booked: false,
      });
    }
    

    return res.status(200).json({
      success: true,
      booked: true,
      status: booking.status,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const generateBill=async(req,res)=>{
    try {
        const customerId=req.user.id;
        const bookings=await Booking.find({
            customerId,
            status:"accepted"
        }).populate("vendorId");
        const billItems=bookings.map((b)=>{
            const finalPrice=b.vendorPriceAtBooking-(b.discount||0)+(b.extraCharges||0);
            return{
                vendorName:b.vendorId.name,
                service:b.vendorId.service,
                basePrice:b.vendorPriceAtBooking,
                discount:b.discount,
                extraCharges:b.extraCharges,
                finalPrice:b.finalPrice
            }
        })
        const totalAmount=billItems.reduce((sum,item)=>sum+item.finalPrice,0);
        return res.status(200).json({
            success:true,
            billItems,
            totalAmount,
            message:"Bill generated Successfully!"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

export const updateCharges=async(req,res)=>{
    try {
        const {bookingId}=req.params;
        const {discount,extraCharges}=req.body;
        const booking=await Booking.findById(bookingId);
        if(!booking){
            return res.status(404).json({
                success:false,
                message:"Booking not found"
            })
        }
        if(discount!==undefined){
            booking.discount=discount;
        }   
        if(extraCharges!==undefined){
            booking.extraCharges=extraCharges;
        }
        await booking.save();
        return res.status(200).json({
            success:true,
            message:"Charges updated Successfully!",
            data:booking
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
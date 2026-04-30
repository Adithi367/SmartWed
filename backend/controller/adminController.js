import Booking from "../models/bookingSchema.js";
import Vendor from "../models/vendorSchema.js";


export const getAdminDashboard = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();

    const pending = await Booking.countDocuments({ status: "pending" });
    const accepted = await Booking.countDocuments({ status: "accepted" });
    const rejected = await Booking.countDocuments({ status: "rejected" });

    const bookings = await Booking.find({ status: "accepted" });

    let totalRevenue = 0;
    bookings.forEach((b) => {
      totalRevenue += (b.vendorPriceAtBooking - b.discount + b.extraCharges);
    });

    const serviceStats = await Booking.aggregate([
      {
        $group: {
          _id: "$service", 
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    const vendorStats = await Booking.aggregate([
      {
        $group: {
          _id: "$vendorId",
          totalBookings: { $sum: 1 }
        }
      },
      { $sort: { totalBookings: -1 } },
      {
        $lookup: {
          from: "vendors",
          localField: "_id",
          foreignField: "_id",
          as: "vendor"
        }
      },
      { $unwind: "$vendor" },
      {
        $project: {
          vendorId: "$_id",
          vendorName: "$vendor.name",
          service: "$vendor.service",
          totalBookings: 1
        }
      }
    ]);

    return res.json({
      success: true,
      totalBookings,
      pending,
      accepted,
      rejected,
      totalRevenue,
      serviceStats,
      vendorStats
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};
export const getAllBookingsAdmin=async(req,res)=>{
    try {
        const {status,startDate,endDate}=req.query;
        let filter={};
        if(status){
            filter.status=status;
        }
        if(startDate && endDate){
            filter.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }
        else if(startDate){
            filter.createdAt={$gte:new Date(startDate)}
        }
        else if(endDate){
            filter.createdAt={$lte:new Date(endDate)}
        }
       
        const bookings=await Booking.find(filter).sort({createdAt:-1}).populate("vendorId","name service");
        return res.json({
            success: true,
            data:bookings
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}
export const getAllFeedback =async (req,res)=> {
    try {
      const vendors=await Vendor.find()
      .select("name service rating totalRatings reviews")
      .populate('reviews.userId','username useremail')
      res.status(200).json({
        success:true,
        data:vendors
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        success:false,
        message:"Error fetching feedback"
      })
      
    }
  
}
import mongoose from "mongoose";
const bookingSchema=new mongoose.Schema({
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    vendorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vendor",
        required:true
    },
    customerName:{
        type:String,
        required:true
    },
    customerEmail:{
        type:String,
        required:true
    },
    customerPhone:{
        type:String,
        required:true
    },
    vendorPriceAtBooking: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },

    extraCharges: {
        type: Number,
        default: 0
    },
    status:{
        type:String,
        enum:["pending","accepted","rejected"],
        default:"pending"
    },
    finalPrice:{
        type:Number,
        required:true
    },
    message:{
        type:String
    },
    quotationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Quotation"
    },
    //new field for direct
    bookingMode:{
        type:String,
        enum:["DIRECT","PLANNED"],
        required:true
    }
},
{timestamps:true}
)

const Booking=new mongoose.model("Booking",bookingSchema)
export default Booking;
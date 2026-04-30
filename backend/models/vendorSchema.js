import mongoose from 'mongoose'
const vendorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    service:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        default:0
        
    },
    totalRatings:{
        type:Number,
        default:0
    },
    image:{
        type:String,
        required:true
    },
    phone: {
        type: String,
        required: true,
    },

    about: {
        type: String,
        required: true,
    },

    reviews: [
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        customerName: { type: String },
        rating: { type: Number },
        comment: { type: String },
        createdAt: { type: Date, default: Date.now }
    },
  ],

})
const Vendor=new mongoose.model('Vendor',vendorSchema)
export default Vendor
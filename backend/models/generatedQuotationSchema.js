import mongoose from 'mongoose'
const generatedQuotationSchema=new mongoose.Schema({
    planId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Plan"
    },
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    service:{
        type:String,
        required:true
    },
    vendorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vendor"
    },
    allocatedBudget:{
        type:Number
    },
    vendorPrice:{
        type:Number
    } ,
    discount:{
        type:Number
    },
    extraCharges:{
        type:Number
    },
    finalPrice:{
        type:Number
    },
    itemsIncluded:{
        type:[String],
        default:[]
    },
    recommendationScore:{
        type:Number
    },
    status:{
        type:String,
        enum:['pending',"approved",'rejected'],
        default:"pending"
    }
    },
    {timestamps:true}
);
generatedQuotationSchema.index(
    {planId:1,vendorId:1,service:1},
    {unique:true}
)
const GeneratedQuotation=new mongoose.model('GeneratedQuotation',generatedQuotationSchema)
export default GeneratedQuotation
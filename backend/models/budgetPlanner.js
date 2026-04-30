import mongoose from "mongoose";
const planSchema=new mongoose.Schema({
    amount:{
        type:String,
        required:true
    },
    guests:{
        type:String,
        required:true
    },
      location:{
        type:String,
        required:true
      },
      services:{
        type:[String],
        required:true
      },
      userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
      }
},
      {
        timestamps:true
      }
)
const Plan=mongoose.model("Plan",planSchema)
export default Plan;
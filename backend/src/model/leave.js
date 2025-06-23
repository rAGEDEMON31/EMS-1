import mongoose from "mongoose";
 const leaveSchema = new mongoose.Schema({
    emp : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Employee",
        required : true
    },
     leaveType :{
        type : String,
        enum : ['paid','unpaid'],
        default : 'paid'
        

     },
     startDate:{
          type : Date,
          required: true
     },
     endDate: {
      type: Date,
      required : true
     },
     Lstatus: {
        type : String,
        enum : ['pending','approved','rejected'],
        default : 'pending'
     },
     appliedAt:{
        type: Date,
        default:Date.now
     },
     reason:{
        type: String,
        default:"Not-specified"
     }
    
 }); 
  export const Leave = mongoose.model("leave",leaveSchema);
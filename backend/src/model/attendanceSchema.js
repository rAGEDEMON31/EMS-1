import mongoose from "mongoose";
const attendance = new mongoose.Schema({
    employeeid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: () => new Date().setHours(0, 0, 0, 0)

    },
    checkInTime : {type:Date},
    checkOutTime : {type:Date},
    totalHours : {type:Number},
    status: {
        type : String,
        enum : ['pending','approved','submitted'],
        default : 'pending'
     },
})

export const Attendance = mongoose.model("Attendance",attendance);
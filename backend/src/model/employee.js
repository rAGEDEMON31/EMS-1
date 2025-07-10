import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  email: {
    type: String,
    unique: true,
    // required: true,
  },
  joiningDate: {
    type: Date,
    // required: true,
    default: Date.now,
  },
  address: {
    city: String,
    state: String,
    pincode: String
  },
  salary : {
    type:Number,
    default : 10000,
  }, 
  leaveBalance :{
    type : Number,
    default: 5
  } ,
  username: {
    type : String
  },
  password:{
     type : String
  },
  roles: []
     ,
    manager:{
        type:String,
        default:"NA"
    }
},{timestamps:true});

export const Employee = mongoose.model("Employee", employeeSchema);
 
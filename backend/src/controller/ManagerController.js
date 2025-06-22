import { Attendance } from "../model/attendanceSchema.js";
import { Employee } from "../model/employee.js"
import { Leave } from "../model/leave.js";

export const getTimeAppovals = async (req,res)=>{
    try {
        const team = await Employee.find({manager:req.body.username});
        var approvals = new Map();
        team.forEach(user=>{
            approvals.set(user,Attendance.find({employeeid:user._id,status:"submitted"}));
        });
        res.status(200).json(approvals);
    } catch (error) {
        res.status(500).json({ message: "ERROR", error });
    }
}
export const getLeaveApprovals = async(req,res)=>{try {
    const team = await Employee.find({manager:req.body.username});
    var approvals = new Map();
    team.forEach(user=>{
        approvals.set(user,Leave.find({employeeid:user._id,status:"submitted"}));
    });
    res.status(200).json(approvals);
} catch (error) {
    res.status(500).json({ message: "ERROR", error });
}}
export const updateTimeApprovals = async(req,res)=>{
    try {
       const entry=await Attendance.findOneAndUpdate({_id:req.body.attendanceId},{status:"approved"});
       res.status(200).json({ message: "SUCCESS", entry });
    } catch (error) {
        res.status(500).json({ message: "ERROR", error });
    }
}
export const updateLeaveApprovals = async(req,res)=>{
    try {
        const entry=await Leave.findOneAndUpdate({_id:req.body.attendanceId},{status:"approved"});
        res.status(200).json({ message: "SUCCESS", entry });
     } catch (error) {
         res.status(500).json({ message: "ERROR", error });
     }
}
export const getTeam = async(req,res)=>{
    try {
        const team = await Employee.find({manager:req.body.username});
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ message: "ERROR", error });
    }
}
export const getSalary = async(req,res)=>{
    try {
        const sal= await Employee.find({employee: user._id,salary:req.body.salary})
        res.status(200).json(sal)
    } catch (error) {
        res.status(500).json({message:"ERROR",error})
    }
}

export const calSalary = async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}

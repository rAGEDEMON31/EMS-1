import { Attendance } from "../model/attendanceSchema.js";
import { Employee } from "../model/employee.js"
import { Leave } from "../model/leave.js";

export const getTimeAppovals = async (req, res) => {
    try {
        const team = await Employee.find({ manager: req.params.manager });
        var approvals = {};
        for(const member of team){
            console.log("Member", member.name);
            
            const timeEntries = await Attendance.find({ employeeid: member._id, status: "submitted" });
            console.log(timeEntries);
            
            approvals[member.name] = timeEntries;
        }
        res.status(200).json(approvals);
    } catch (error) {
        console.error(error);
        
        res.status(500).json({ message: "ERROR", error });
    }
}
export const getLeaveApprovals = async (req, res) => {
    try {
        const team = await Employee.find({ manager: req.params.manager });
        const approvals = {}
        for (const member of team) {
            console.log(member);
            let leaves = await Leave.find({ emp: member._id, Lstatus: "pending" });
            approvals[member.name]= leaves;
        }
        console.log("Finallly", approvals);

        res.status(200).json(approvals);
    } catch (error) {
        res.status(500).json({ message: "ERROR", error });
    }
}
export const updateTimeApprovals = async (req, res) => {
    try {
        const entry = await Attendance.findOneAndUpdate({ _id: req.body.attendanceId }, { status: "approved" });
        res.status(200).json({ message: "SUCCESS", entry });
    } catch (error) {
        res.status(500).json({ message: "ERROR", error });
    }
}
export const updateLeaveApprovals = async (req, res) => {
    try {
        const entry = await Leave.findOneAndUpdate({ _id: req.body.attendanceId }, { Lstatus: "approved" });
        res.status(200).json({ message: "SUCCESS", entry });
    } catch (error) {
        res.status(500).json({ message: "ERROR", error });
    }
}
export const getTeam = async (req, res) => {
    try {
        const team = await Employee.find({ manager: req.params.manager });
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ message: "ERROR", error });
    }
}
export const getSalary = async (req, res) => {
    try {
        const {manager} = req.params.manager;
        const sal = await Employee.find({ manager:manager })
        
        res.status(200).json(sal)
    } catch (error) {
        res.status(500).json({ message: "ERROR", error })
    }
}

export const calSalary = async (req, res) => {
    try {

    } catch (error) {

    }
}

import { Attendance } from "../model/attendanceSchema.js";
import { Employee } from "../model/employee.js";
import {Leave} from "../model/leave.js";

export const signInEmployee = async (req,res) => {
    try {
        const {email, pass} = req.body;
        const user = await Employee.findOne({email:email,password:pass});
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export const signupEmployee = async (req, res) => {
    try {
        console.log(req);
        
        const emp = new Employee(req.body);
        const userByUsername = await Employee.findOne({ username: req.body.username });
        if (userByUsername) {
            return res.status(400).json({ message: "Failed! Username is already in use!" });
        }

        const userByEmail = await Employee.findOne({ email: req.body.email });
        if (userByEmail) {
            return res.status(400).json({ message: "Failed! Email is already in use!" });
        }

        const resp = await emp.save();
        res.status(201).json({ message: "Added employee with id" + resp._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getEmployee = async(req, res) => {
    try {
        console.log(req.params);
        
        const user = await Employee.findOne({ username: req.params.username });
        if (user)
            res.status(200).json(user);
        else
            res.status(404).json({ message: "No user found for this username" })
    } catch (error) {
        console.error(error);
        
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getAllEmployees = async(req, res) => {
    try {
        const allEmployees = await Employee.find();
        res.status(200).json(allEmployees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const checkIn = async(req, res)=>{
    try {
        const today = new Date().setHours(0, 0, 0, 0);
        const { employeeid } = req.body;
        console.log(employeeid);

        const alreadyCheckedIn = await Attendance.findOne({ employeeid, date: today });
        if (alreadyCheckedIn) {
            return res.status(400).json({ message: "Already checked in today" });
        }

        const checkIn = new Attendance({
            employeeid,
            date: today,
            checkInTime: new Date()
        })
        const result = await checkIn.save();
        res.status(201).json({ message: "Checked in", data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const checkOut = async(req, res)=>{
    try {
        const today = new Date().setHours(0, 0, 0, 0);
        const { employeeid } = req.body;
        const alreadyCheckedIn = await Attendance.findOne({ employeeid, date: today });
        if (alreadyCheckedIn && !alreadyCheckedIn.checkOutTime) {
            alreadyCheckedIn.set("checkOutTime", new Date());
            alreadyCheckedIn.set("totalHours", alreadyCheckedIn.get("checkOutTime").getHours() - alreadyCheckedIn.get("checkInTime").getHours());
            console.log(alreadyCheckedIn);
            alreadyCheckedIn.save();
            res.status(200).json({ alreadyCheckedIn });
        }
        else if(alreadyCheckedIn && alreadyCheckedIn.checkOutTime){
            res.status(403).json({message:"check in first"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteTime = async(req,res)=>{
    try {
        const timeEntry = Attendance.findOne({employeeid:timeEntry.employeeid , date:timeEntry.date});
        if(timeEntry&&!timeEntry.status==="pending")
            await timeEntry.deleteOne({employeeid:timeEntry.employeeid , date:timeEntry.date}).then(res.status(201).json({message:"Time Entry deleted"}));
        else
            res.status(403).json({message:"Time Entry Already approved or does not exist"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const submitted = async(req, res)=>{
    try {
        const timeSubmitted = await Attendance.find({employeeid:req.body.employeeid,status:"pending"});
        if(timeSubmitted.length>0){
            (await timeSubmitted).forEach(entry =>{
                entry.set({status:"submitted"});
                entry.save();
            })
        }
        // timeSubmitted.save();
        res.status(200).json({message:"Submitted to manager"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const submitLeaves = async(req,res)=>{
    try {
        const { emp } = req.body;
        const { startDate, endDate, reason, Lstatus, leaveType } = req.body;
        const leaveDays = reduction(new Date(startDate), new Date(endDate));
        const employee = await Employee.findById(emp);
        if (!employee) return res.status(404).json({ message: "Employee not found" });
        if (employee.leaveBalance < leaveDays) {
            return res.status(400).json({ message: "Insufficient leave balance" });
        }
        console.log("Current leaveBalance:", employee.leaveBalance);
        console.log("Leave days to add:", leaveDays);

        employee.leaveBalance -= leaveDays;
        console.log("Updated leaveBalance:", employee.leaveBalance);

        await employee.save();

        const leaveRequest = new Leave({
            emp,
            startDate,
            endDate,
            reason,
            Lstatus,
            leaveType,
        })
        await leaveRequest.save();
        res.status(200).json({ message: "Leave sent successfully" })
    }
    catch (error) {
        res.status(500).json({ message: "ERROR", error });
    }
}
import { Attendance } from "../model/attendanceSchema.js";
import { Employee } from "../model/employee.js";
import {Leave} from "../model/leave.js";
import moment from 'moment';

export const signInEmployee = async (req,res) => {
    try {
        console.log(req)
        const {email, pass} = req.body;
        const user = await Employee.findOne({email:email,password:pass});
        // req.session.user = {empId:user._id};
        // console.log(req.session);
        // req.session.save();
        // console.log("On login" , req.session.user);
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

// export const checkIn = async(req, res)=>{
//     try {
//         const today = new Date().setHours(0, 0, 0, 0);
//         const { employeeid } = req.body;
//         console.log(employeeid);

//         const alreadyCheckedIn = await Attendance.findOne({ employeeid, date: today });
//         if (alreadyCheckedIn) {
//             return res.status(400).json({ message: "Already checked in today" });
//         }

//         const checkIn = new Attendance({
//             employeeid,
//             date: today,
//             checkInTime: new Date()
//         })
//         const result = await checkIn.save();
//         res.status(201).json({ message: "Checked in", data: result });
        
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// }

// export const checkOut = async(req, res)=>{
//     try {
//         const today = new Date().setHours(0, 0, 0, 0);
//         const { employeeid } = req.body;
//         const alreadyCheckedIn = await Attendance.findOne({ employeeid, date: today });
//         if (alreadyCheckedIn && !alreadyCheckedIn.checkOutTime) {
//             alreadyCheckedIn.set("checkOutTime", new Date());
//             alreadyCheckedIn.set("totalHours", alreadyCheckedIn.get("checkOutTime").getHours() - alreadyCheckedIn.get("checkInTime").getHours());
//             console.log(alreadyCheckedIn);
//             alreadyCheckedIn.save();
//             res.status(200).json({ alreadyCheckedIn });
//         }
//         else if(alreadyCheckedIn && alreadyCheckedIn.checkOutTime){
//             res.status(403).json({message:"check in first"});
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// }
export const attendance= async (req, res) => { 
    try {
            const { employeeid , date, checkedIn,checkedOut} = req.body;
            console.log(employeeid);
            const alreadyCheckedIn = await Attendance.findOne({ employeeid, date: new Date(date) });
            console.log(alreadyCheckedIn);
            if(alreadyCheckedIn==null){
                const checkIn = new Attendance({
                    employeeid,
                    date: new Date(date),
                    checkInTime: new Date(checkedIn),
                    checkOutTime: new Date(checkedOut),
                    totalHours: new Date(checkedOut).getHours() - new Date(checkedIn).getHours(),
                    status: "pending"
                });
                console.log(checkIn);
                const result = await checkIn.save();
                res.status(201).json({ message: "Checked in", data: result });
            }
            else{
                  res.status(204).json({ message: "Already Checked in", data: alreadyCheckedIn });
            }
    
        }
        catch (error) {
            console.log(error);
            
            res.status(500).json({ message: "Error", error })
        }
    }

export const getAttendance = async(req, res) => {
    try {
        console.log(req.session);
        const { employeeid, date } = req.params;
        let startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0); // Set time to midnight to avoid issues with time zones
        const lastDate = new Date(date);
        lastDate.setDate(lastDate.getDate() + 6);
        const attendanceData = await Attendance.find({ employeeid, date: { $gte: startDate , $lte:lastDate} });
        if (attendanceData.length > 0) {
            console.log(attendanceData);
            
            res.status(200).json(attendanceData);
        } else {
            console.log("No attendance data found for this employee");
            res.status(404).json({ message: "No attendance data found for this employee" });
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
        const { employeeid, date } = req.body;
         let startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0); // Set time to midnight to avoid issues with time zones
        const lastDate = new Date(date);
        lastDate.setDate(lastDate.getDate() + 6);
        const timeSubmitted = await Attendance.find({employeeid, date:{$gte:startDate,$lte:lastDate} , status: "pending"});
        if(timeSubmitted.length>0){
            ( timeSubmitted).forEach(entry =>{
                entry.set({status:"submitted"});
                entry.save();
            })
        }
        // await timeSubmitted.save();
        res.status(200).json({message:"Submitted to manager"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const submitLeaves = async(req,res)=>{
    try {
        const { empId, startDate, endDate, reason,  leaveType } = req.body;
        const leaveDays = moment(endDate).diff(moment(startDate),'days')+1;
        const employee = await Employee.findById(empId);
        if (!employee) return res.status(404).json({ message: "Employee not found" });
        if (employee.leaveBalance < leaveDays) {
            return res.status(400).json({ message: "Insufficient leave balance" });
        }
        console.log("Current leaveBalance:", employee.leaveBalance);
        console.log("Leave days to add:", leaveDays);
        const leaveRequest = new Leave({
            emp:empId,
            startDate,
            endDate
        })
        await leaveRequest.save();
        employee.leaveBalance -= leaveDays;
        console.log("Updated leaveBalance:", employee.leaveBalance);
        await employee.save();
        res.status(200).json({ message: "Leave sent successfully" })
    }
    catch (error) {
        res.status(500).json({ message: "ERROR", error });
    }
} 
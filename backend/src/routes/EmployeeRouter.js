import express from "express";
import {  attendance, getAllEmployees, getEmployee, signInEmployee, signupEmployee, submitLeaves, submitted, getAttendance} from  "../controller/EmployeeController.js";

const router = express.Router();

router.post("/login",signInEmployee);
router.get("/getEmployee/:username",getEmployee);
router.post("/addNewEmployee",signupEmployee);
router.get("/allEmployees", getAllEmployees);
router.put("/submit",submitted);
router.post("/editLeaves",submitLeaves);
router.post("/attendance",attendance);
router.get("/attendance/:employeeid/:date",getAttendance);


export default router;
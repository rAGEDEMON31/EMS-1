import express from "express";
import {  checkIn, checkOut, deleteTime, getAllEmployees, getEmployee, signInEmployee, signupEmployee, submitLeaves, submitted } from  "../controller/EmployeeController.js";

const router = express.Router();

router.get("/login",signInEmployee);
router.get("/getEmployee/:username",getEmployee);
router.post("/addNewEmployee",signupEmployee);
router.get("/allEmployees", getAllEmployees);
router.post("/checkIn",checkIn);
router.post("/checkOut",checkOut);
router.put("/submit",submitted);
router.post("/editLeaves",submitLeaves);

export default router;
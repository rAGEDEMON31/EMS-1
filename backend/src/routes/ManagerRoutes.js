import express from "express";
import { getTeam } from "../controller/ManagerController.js";
import { getLeaveApprovals,  getTimeAppovals, updateLeaveApprovals, updateTimeApprovals } from "../controller/ManagerController.js";

const router = express.Router();

router.get("/myTeam/:manager",getTeam);
router.get("/timeApprovals/:manager",getTimeAppovals);
router.get("/leaveApprovals/:manager",getLeaveApprovals);
router.put("/updatedtimeApproval",updateTimeApprovals);
router.put("/updateLeaveApproval", updateLeaveApprovals );


export default router;
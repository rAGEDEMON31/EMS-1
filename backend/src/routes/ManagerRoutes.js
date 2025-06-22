import express from "express";
import { getTeam } from "../controller/ManagerController.js";
import { getLeaveApprovals,  getTimeAppovals, updateLeaveApprovals, updateTimeApprovals } from "../controller/ManagerController.js";

const router = express.Router();

router.get("/myTeam/:manager",getTeam);
router.get("/timeApprovals",getTimeAppovals);
router.get("/leaveAprrovals",getLeaveApprovals);
router.put("/updatedtimeApproval",updateTimeApprovals);
router.put("/updateLeaveApproval", updateLeaveApprovals );


export default router;
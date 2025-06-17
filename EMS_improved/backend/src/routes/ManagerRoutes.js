import express from "express";
import { getTeam } from "../controller/ManagerController.js";
// import { getLeaveApprovals, getTeam, getTimeAppovals, updateLeaveApprovals, updateTimeApprovals } from "../controller/ManagerController";

const router = express.Router();

router.get("/myTeam",getTeam);
// router.get("/timeApprovals",getTimeAppovals);
// router.get("/leaveAprrovals",getLeaveApprovals);
// router.put("/updatedtimeApproval",updateTimeApprovals);
// router.put("/updateLeaveApproval", updateLeaveApprovals );


export default router;
import express from "express";
import cors from "cors";
import EmployeeRouter from "./routes/EmployeeRouter.js";
import ManagerRouter from "./routes/ManagerRoutes.js"
import {connectDB} from "./config/db.js"
import dotenv from "dotenv";

const app = express();
dotenv.config();

connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/employee", EmployeeRouter);
app.use("/api/manager",ManagerRouter);

const PORT = 8081;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}.`);
  });
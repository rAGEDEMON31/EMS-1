import express from "express";
import cors from "cors";
import EmployeeRouter from "./routes/EmployeeRouter.js";
import ManagerRouter from "./routes/ManagerRoutes.js"
import {connectDB} from "./config/db.js"
import dotenv from "dotenv";
import session from "express-session";

const app = express();
dotenv.config();

connectDB();

app.use(session({
   secret: "your-secret-key",
   resave: false,
   saveUninitialized: true,
   cookie: { secure: false, httpOnly: true }
 }))
app.use(express.json());
app.use(cors({credentials:true}));

app.use("/api/employee", EmployeeRouter);
app.use("/api/manager",ManagerRouter);

const PORT = 8081;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}.`);
  });
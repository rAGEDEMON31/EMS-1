import mongoose from "mongoose";
import {Employee} from "./eSchema.js";
import role from "./role.model.js";
mongoose.Promise = global.Promise;

const db = {};


db.ROLES = ["user", "admin", "moderator"];

export default db;

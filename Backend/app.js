import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
const app = express();
import cookieParser from "cookie-parser";
import connectToDb from "./db/db.js";
import userRoutes from "./routes/user.route.js";
import captainRoutes from "./routes/captain.route.js";
connectToDb();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/users", userRoutes);
app.use("/captains", captainRoutes);
export default app;

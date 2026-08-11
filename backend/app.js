import express from "express";
import authRoutes from "./src/routes/auth.routes.js";
import { errorMiddleware } from "./src/middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import resumeRoutes from "./src/routes/resume.routes.js";
import cors from "cors";

let app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/health-check", (req, res)=>{
    return res.status(200).json({
        success: true,
        message: "Server is running"
    })
})

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/resume", resumeRoutes);

app.use(errorMiddleware);

export default app;
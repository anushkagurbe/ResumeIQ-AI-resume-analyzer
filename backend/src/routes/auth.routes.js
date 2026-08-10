import express from "express";
import { getMe, login, logout, refreshToken, register } from "../controllers/auth.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validateMiddleware } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../../validators/auth.validators.js";

let router = express.Router();

router.post("/register", validateMiddleware(registerSchema), register);
router.post("/login", validateMiddleware(loginSchema), login);
router.get("/get-me", authMiddleware, getMe);
router.post('/logout', logout);
router.post("/refresh-token", refreshToken);

export default router;
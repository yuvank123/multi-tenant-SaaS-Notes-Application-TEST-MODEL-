// routes/authRoutes.js
import express from "express";
import { login } from "../controllers/authController.js";

const router = express.Router();

// Auth routes
router.post("/login", login);

export default router;

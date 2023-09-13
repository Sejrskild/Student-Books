import express from "express";
import { Router } from "express";
import {
  confirmEmail,
  createUser,
  login,
  forgotPasswordCode,
  handlePasswordCodeVerification,
  handlePasswordChange,
} from "../controllers/userControllers.js";

const router = Router();

router.post("/signup", createUser);
router.post("/login", login);

// Password Reset
router.post("/forgot-password-code", forgotPasswordCode);
router.post(
  "/forgot-password-code-verification",
  handlePasswordCodeVerification
);
router.post("/reset-password", handlePasswordChange);

// Confirm Email Route
router.get("/confirm-email", confirmEmail);

export default router;

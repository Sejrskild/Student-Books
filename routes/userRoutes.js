import express from "express";
import { Router } from "express";
import {
  confirmEmail,
  createUser,
  login,
  forgotPasswordCode,
  handlePasswordCodeVerification,
  handlePasswordChange,
  getUser,
  getUserInformation,
} from "../controllers/userControllers.js";

const router = Router();

// Get Single User - to be used for own profile
router.post("/single-user", getUser);

// Get Users Information for Sales
router.get("/", getUserInformation);

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

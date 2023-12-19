import express from "express";
import { Router } from "express";
import {
  confirmEmail,
  createUser,
  login,
  forgotPasswordCode,
  handlePasswordCodeVerification,
  handlePasswordChange,
  updateUser,
  getUser,
  getUserInformation,
} from "../controllers/userControllers.js";

const router = Router();

router.patch("/:id", updateUser);

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

// Get Single User - to be used for own profile
// router.post("/single-user", getUser);

// Get Users Information for Sales
// router.get("/", getUserInformation);

export default router;

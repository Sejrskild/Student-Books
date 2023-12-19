import { Router } from "express";
import {
  createItem,
  getAllItems,
  getSingleItem,
  generateDescriptionWithOpenAI,
  getTextFromImage,
  getItemsByUser,
  deleteItem,
  getItemsBySearch,
} from "../controllers/itemControllers.js";

const router = Router();

// Get All Items
router.get("/", getAllItems);

// Get Items by search
router.get("/search", getItemsBySearch);

// Get Single Item
router.get("/:id", getSingleItem);

// Create Item
router.post("/", createItem);

// Get Items by the logged in user
router.get("/user/:id", getItemsByUser);

// Delete Item
router.delete("/:id", deleteItem);

router.post("/generate-description", generateDescriptionWithOpenAI);
router.post("/get-text-from-image", getTextFromImage);

export default router;

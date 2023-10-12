import { Router } from "express";
import {
  createItem,
  getAllItems,
  getSingleItem,
  generateDescriptionWithOpenAI,
  getTextFromImage,
} from "../controllers/itemControllers.js";

const router = Router();

router.get("/", getAllItems);
router.get("/:id", getSingleItem);
router.post("/", createItem);

router.post("/generate-description", generateDescriptionWithOpenAI);
router.post("/get-text-from-image", getTextFromImage);

export default router;

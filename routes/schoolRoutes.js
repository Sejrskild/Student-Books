import { Router } from "express";

import { getSchools } from "../controllers/schoolControllers.js";

const router = Router();

router.get("/", getSchools);

export default router;

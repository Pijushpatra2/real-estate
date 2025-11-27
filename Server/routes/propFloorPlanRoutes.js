import express from "express";
import {
  handleGetFloorPlans,
  handleAddFloorPlan,
  handleUpdateFloorPlan,
  handleDeleteFloorPlan,
} from "../controllers/propFloorPlanController.js";

import { handleFloorPlanImageUpload } from "../middleware/fileUpload.js";

const router = express.Router();

// Get all floor plans by property ID
router.get("/get/:prop_id", handleGetFloorPlans);

// Add new floor plan (with image)
router.post("/add", handleFloorPlanImageUpload, handleAddFloorPlan);

// Update floor plan by ID (with optional image)
router.put("/update/:floor_plan_id", handleFloorPlanImageUpload, handleUpdateFloorPlan);

// Delete floor plan by ID
router.delete("/delete/:floor_plan_id", handleDeleteFloorPlan);

export default router;

import express from "express";
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty
} from "../controllers/listingPropControllers.js";

const router = express.Router();

router.get("/get/all", getAllProperties);
router.get("/get/:id", getPropertyById);
router.post("/add", createProperty);
router.put("/update/:id", updateProperty);
router.delete("/delete/:id", deleteProperty);

export default router;

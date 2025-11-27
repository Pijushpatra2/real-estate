import express from "express";
import {
  addAmenity,
  getAmenities,
  deleteAmenity,
  addDocument,
  getDocuments,
  deleteDocument,
} from "../controllers/propertyExtrasController.js";

const router = express.Router();

// Amenity routes
router.post("/amenity/add", addAmenity);
router.get("/amenity/get/:property_id", getAmenities);
router.delete("/amenity/delete/:id", deleteAmenity);

// Document routes
router.post("/document/add", addDocument);
router.get("/document/get/:property_id", getDocuments);
router.delete("/document/delete/:id", deleteDocument);

export default router;

import express from "express";
import {
  getAllCities,
  getCityById,
  createCity,
  updateCity,
  deleteCity
} from "../controllers/citiesController.js";
import { handleCityImageUpload } from "../middleware/fileUpload.js";

const router = express.Router();

// Public Routes
router.get("/get/all", getAllCities);
router.get("/get/:id", getCityById);

// Admin Routes
router.post("/add", handleCityImageUpload, createCity);  
router.put("/update/:id", handleCityImageUpload, updateCity); 
router.delete("/delete/:id", deleteCity);

export default router;

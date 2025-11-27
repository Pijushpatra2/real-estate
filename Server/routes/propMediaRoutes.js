// File: propMediaRoutes.js
import express from "express";
import {
  handleGetMediaByPropertyId,
  handleAddMedia,
  handleBulkInsertMedia,
  handleDeleteMedia,
} from "../controllers/propMediaController.js";
import { handleMultiplePropertyGalleryUpload, handlePropertyGalleryUpload } from "../middleware/fileUpload.js";


const router = express.Router();

// @route   GET /api/media/property/:prop_id
router.get("/get/:prop_id", handleGetMediaByPropertyId);

// @route   POST /api/media/upload
router.post("/upload", handlePropertyGalleryUpload, handleAddMedia);

// @route   POST /api/media/bulk-insert
router.post("/upload-multiple", handleMultiplePropertyGalleryUpload, handleBulkInsertMedia);

// @route   DELETE /api/media/delete/:media_id
router.delete("/delete/:media_id", handleDeleteMedia);

export default router;

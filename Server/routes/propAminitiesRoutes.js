import express from 'express';
import {
  handleGetAllAminities,
  handleGetAminitiesByPropertyId,
  handleCreateAminity,
  handleUpdateAminity,
  handleDeleteAminity,
  handleBulkInsertAminities
} from '../controllers/propAminitiesController.js';

const router = express.Router();

// @route   GET /api/aminities
router.get('/get/all', handleGetAllAminities);

// @route   GET /api/aminities/property/:property_id
router.get('/get/property/:property_id', handleGetAminitiesByPropertyId);

// @route   POST /api/aminities/add
router.post('/add', handleCreateAminity);

// @route   POST /api/aminities/bulk-insert
router.post('/add/bulk-insert', handleBulkInsertAminities);

// @route   PUT /api/aminities/update/:aminities_id
router.put('/update/:aminities_id', handleUpdateAminity);

// @route   DELETE /api/aminities/delete/:aminities_id
router.delete('/delete/:aminities_id', handleDeleteAminity);

export default router;

import express from 'express';
import {
  handleCreateLocation,
  handleGetLocationByPropertyId,
  handleUpdateLocation,
  handleDeleteLocation
} from '../controllers/locationController.js';

const router = express.Router();

// POST /api/locations/add
router.post('/add', handleCreateLocation);

// GET /api/locations/:property_id
router.get('/:property_id', handleGetLocationByPropertyId);

// PUT /api/locations/update/:property_id
router.put('/update/:property_id', handleUpdateLocation);

// DELETE /api/locations/delete/:property_id
router.delete('/delete/:property_id', handleDeleteLocation);

export default router;

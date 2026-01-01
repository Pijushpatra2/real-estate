import express from 'express';
import {
  handleGetAllProperties,
  handleGetPropertyById,
  handleCreateProperty,
  handleUpdateProperty,
  handleDeleteProperty,
  handleGetPropertiesByCity,
  handleGetPropertiesByCityId,
} from '../controllers/propertyController.js';

import { handlePropertyImageUpload } from '../middleware/fileUpload.js'; // <-- import upload middleware


const router = express.Router();

// Public Routes
router.get('/get/all', handleGetAllProperties);
//get properties by city
router.get('/get/by-city', handleGetPropertiesByCity);

//get properties by city_id
router.get('/get/by-city/:city_id', handleGetPropertiesByCityId);

router.get('/get/:id', handleGetPropertyById);


// Admin Routes
router.post('/add', handlePropertyImageUpload, handleCreateProperty); 

router.put('/update/:id', handlePropertyImageUpload, handleUpdateProperty); 
router.delete('/delete/:id', handleDeleteProperty);

export default router;

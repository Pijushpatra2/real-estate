import {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  getPropertiesGroupedByCity,
  getPropertiesByCityId
} from '../modules/propertyModules.js';

// // @desc   Get all properties
// export const handleGetAllProperties = async (req, res) => {
//   try {
//     const properties = await getAllProperties();
//     res.status(200).json(properties);
//   } catch (error) {
//     console.error('Error fetching properties:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// @desc   Get all properties with optional filters
export const handleGetAllProperties = async (req, res) => {
  try {
    const { type, exclude, limit } = req.query;

    const properties = await getAllProperties({
      type,
      exclude,
      limit,
    });

    res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



// @desc   Get single property by property_id
export const handleGetPropertyById = async (req, res) => {
  try {
    const property_id = req.params.id;  // corrected
    const property = await getPropertyById(property_id);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.status(200).json(property);
  } catch (error) {
    console.error('Error fetching property:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//  Create new property
export const handleCreateProperty = async (req, res) => {
  try {
    const newPropertyData = req.body;

    // Add uploaded image path if file exists
    if (req.file) {
      newPropertyData.prop_image = `/uploads/properties/${req.file.filename}`;
    }

    const insertedId = await createProperty(newPropertyData);

    res.status(201).json({
      message: 'Property created successfully',
      property_id: insertedId,
    });
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// @desc   Update property
export const handleUpdateProperty = async (req, res) => {
  try {
    const property_id = req.params.id; // 🔧 FIXED here
    const updatedData = req.body;

    // Add new image path if a file is uploaded
    if (req.file) {
      updatedData.prop_image = `/uploads/properties/${req.file.filename}`;
    }

    const result = await updateProperty(property_id, updatedData);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Property not found' });
    }

    res.status(200).json({ message: 'Property updated successfully' });
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// @desc   Delete property
export const handleDeleteProperty = async (req, res) => {
  try {
    const property_id = req.params.id; // updated
    const result = await deleteProperty(property_id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Property not found' });
    }

    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const handleGetPropertiesByCity = async (req, res) => {
  try {
    const result = await getPropertiesGroupedByCity();
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error("Error fetching grouped properties:", err);
    res.status(500).json({ success: false, error: "Failed to fetch city-wise property data" });
  }
};

export const handleGetPropertiesByCityId = async (req, res) => {
  const city_id = req.params.city_id;

  try {
    const properties = await getPropertiesByCityId(city_id);
    
    if (properties.length === 0) {
      return res.status(404).json({ success: false, message: "No properties found for this city" });
    }

    res.status(200).json({ success: true, data: properties });
  } catch (error) {
    console.error("Error fetching city properties:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
import {
  getAllAminities,
  getAminitiesByPropertyId,
  createAminity,
  updateAminity,
  deleteAminity,
  bulkInsertAminities
} from '../modules/propAminitiesModules.js';

// @desc   Get all amenities
export const handleGetAllAminities = async (req, res) => {
  try {
    const data = await getAllAminities();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching amenities:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// @desc   Get amenities by property ID
export const handleGetAminitiesByPropertyId = async (req, res) => {
  try {
    const propertyId = req.params.property_id;
    const data = await getAminitiesByPropertyId(propertyId);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching amenities by property ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// @desc   Create new amenity
export const handleCreateAminity = async (req, res) => {
  try {
    const { aminities_name, property_id } = req.body;
    if (!aminities_name || !property_id) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const insertedId = await createAminity({ aminities_name, property_id });
    res.status(201).json({ message: 'Amenity created successfully', id: insertedId });
  } catch (error) {
    console.error('Error creating amenity:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// @desc   Bulk insert amenities
export const handleBulkInsertAminities = async (req, res) => {
  try {
    const aminitiesList = req.body;

    if (!Array.isArray(aminitiesList) || aminitiesList.length === 0) {
      return res.status(400).json({ error: 'Request body must be a non-empty array' });
    }

    const result = await bulkInsertAminities(aminitiesList);
    res.status(201).json({ message: 'Amenities inserted successfully', inserted: result.affectedRows });
  } catch (error) {
    console.error('Error bulk inserting amenities:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// @desc   Update amenity
export const handleUpdateAminity = async (req, res) => {
  try {
    const aminities_id = req.params.aminities_id;
    const { aminities_name, property_id } = req.body;
    const result = await updateAminity(aminities_id, { aminities_name, property_id });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Amenity not found' });
    }

    res.status(200).json({ message: 'Amenity updated successfully' });
  } catch (error) {
    console.error('Error updating amenity:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// @desc   Delete amenity
export const handleDeleteAminity = async (req, res) => {
  try {
    const aminities_id = req.params.aminities_id;
    const result = await deleteAminity(aminities_id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Amenity not found' });
    }

    res.status(200).json({ message: 'Amenity deleted successfully' });
  } catch (error) {
    console.error('Error deleting amenity:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

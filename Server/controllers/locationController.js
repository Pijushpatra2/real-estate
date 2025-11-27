import {
  createLocation,
  getLocationByPropertyId,
  updateLocation,
  deleteLocation
} from '../modules/locationModule.js';

export const handleCreateLocation = async (req, res) => {
  try {
    const locationData = req.body;
    const insertedId = await createLocation(locationData);
    res.status(201).json({ message: 'Location added', id: insertedId });
  } catch (error) {
    console.error('Create location error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const handleGetLocationByPropertyId = async (req, res) => {
  try {
    const property_id = req.params.property_id;
    const location = await getLocationByPropertyId(property_id);
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }
    res.status(200).json(location);
  } catch (error) {
    console.error('Get location error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const handleUpdateLocation = async (req, res) => {
  try {
    const property_id = req.params.property_id;
    const updatedData = req.body;
    const result = await updateLocation(property_id, updatedData);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Location not found' });
    }
    res.status(200).json({ message: 'Location updated' });
  } catch (error) {
    console.error('Update location error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const handleDeleteLocation = async (req, res) => {
  try {
    const property_id = req.params.property_id;
    const result = await deleteLocation(property_id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Location not found' });
    }
    res.status(200).json({ message: 'Location deleted' });
  } catch (error) {
    console.error('Delete location error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

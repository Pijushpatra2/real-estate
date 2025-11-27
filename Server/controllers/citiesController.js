import * as CityModules from "../modules/citiesModules.js";

// GET /cities
export const getAllCities = async (req, res) => {
  try {
    const cities = await CityModules.getAllCities();
    res.status(200).json({ success: true, cities });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch cities", error: err.message });
  }
};

// GET /cities/:id
export const getCityById = async (req, res) => {
  try {
    const city = await CityModules.getCityById(req.params.id);
    if (!city) return res.status(404).json({ success: false, message: "City not found" });
    res.status(200).json({ success: true, city });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching city", error: err.message });
  }
};

// POST /cities
export const createCity = async (req, res) => {
  try {
    const { name } = req.body;

    const cityImage = req.file
      ? `/uploads/cities/${req.file.filename}`
      : null;

    const cityId = await CityModules.createCity({
      name,
      cityImage,
    });

    res.status(201).json({ id: cityId, message: "City created successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error creating city" });
  }
};

// PUT /cities/:id
export const updateCity = async (req, res) => {
  try {
    const { name } = req.body;

    // Fetch the existing city to get the current image if needed
    const existingCity = await CityModules.getCityById(req.params.id);
    if (!existingCity) {
      return res.status(404).json({ error: "City not found" });
    }

    // Use the new image path if uploaded, otherwise keep the old one
    const cityImage = req.file
      ? `/uploads/cities/${req.file.filename}`
      : existingCity.cityImage;

    await CityModules.updateCity(req.params.id, {
      name,
      cityImage,
    });

    res.json({ message: "City updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating city" });
  }
};

// DELETE /cities/:id
export const deleteCity = async (req, res) => {
  try {
    await CityModules.deleteCity(req.params.id);
    res.status(200).json({ success: true, message: "City deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting city", error: err.message });
  }
};

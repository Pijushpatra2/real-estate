import * as extras from "../modulars/propertyExtrasModules.js";

// ➕ Add Amenity
export const addAmenity = async (req, res) => {
  try {
    const { property_id, amenity } = req.body;
    const result = await extras.createAmenity(property_id, amenity);
    res.status(201).json({ success: true, id: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📄 Add Document
export const addDocument = async (req, res) => {
  try {
    const { property_id, document_type } = req.body;
    const result = await extras.createDocument(property_id, document_type);
    res.status(201).json({ success: true, id: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🔍 Get Amenities by Property ID
export const getAmenities = async (req, res) => {
  try {
    const { property_id } = req.params;
    const results = await extras.getAmenitiesByPropertyId(property_id);
    res.status(200).json({ success: true, amenities: results });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🔍 Get Documents by Property ID
export const getDocuments = async (req, res) => {
  try {
    const { property_id } = req.params;
    const results = await extras.getDocumentsByPropertyId(property_id);
    res.status(200).json({ success: true, documents: results });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ❌ Delete Amenity
export const deleteAmenity = async (req, res) => {
  try {
    const { id } = req.params;
    await extras.deleteAmenity(id);
    res.status(200).json({ success: true, message: "Amenity deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ❌ Delete Document
export const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    await extras.deleteDocument(id);
    res.status(200).json({ success: true, message: "Document deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

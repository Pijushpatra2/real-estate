// import * as propertyModules from "../modules/listingPropModules.js";

// export const createProperty = async (req, res) => {
//   try {
//     const data = req.body;
//     const result = await propertyModules.createProperty(data);
//     res.status(201).json({ success: true, message: "Property listed successfully", id: result.insertId });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// export const getAllProperties = async (req, res) => {
//   try {
//     const properties = await propertyModules.getAllProperties();
//     res.status(200).json({ success: true, properties });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// export const getPropertyById = async (req, res) => {
//   try {
//     const property = await propertyModules.getPropertyById(req.params.id);
//     if (!property) {
//       return res.status(404).json({ success: false, message: "Property not found" });
//     }
//     res.status(200).json({ success: true, property });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// export const updateProperty = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const updatedData = req.body;
//     await propertyModules.updateProperty(id, updatedData);
//     res.status(200).json({ success: true, message: "Property updated successfully" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// export const deleteProperty = async (req, res) => {
//   try {
//     await propertyModules.deleteProperty(req.params.id);
//     res.status(200).json({ success: true, message: "Property deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };



// =====================================

import * as propertyModules from "../modules/listingPropModules.js";

const toCommaString = (input) => {
  if (Array.isArray(input)) return input.join(",");
  if (typeof input === "string") return input;
  return "";
};

export const createProperty = async (req, res) => {
  try {
    const data = req.body;

    data.amenities = toCommaString(data.amenities);
    data.document_types = toCommaString(data.document_types);

    const result = await propertyModules.createProperty(data);

    res.status(201).json({
      success: true,
      message: "Property listed successfully",
      id: result.insertId,
    });
  } catch (err) {
    console.error("CREATE ERROR:", err); // ✅ log it to debug
    res.status(500).json({ success: false, message: err.message });
  }
};


// Get all properties
export const getAllProperties = async (req, res) => {
  try {
    const properties = await propertyModules.getAllProperties();
    res.status(200).json({ success: true, properties });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get a single property
export const getPropertyById = async (req, res) => {
  try {
    const property = await propertyModules.getPropertyById(req.params.id);
    if (!property) {
      return res.status(404).json({ success: false, message: "Property not found" });
    }
    res.status(200).json({ success: true, property });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update property
export const updateProperty = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    // Convert array fields to comma-separated strings
if (Array.isArray(data.amenities)) {
  data.amenities = data.amenities.join(",");
} else if (typeof data.amenities === "string") {
  data.amenities = data.amenities;
} else {
  data.amenities = "";
}

if (Array.isArray(data.document_types)) {
  data.document_types = data.document_types.join(",");
} else if (typeof data.document_types === "string") {
  data.document_types = data.document_types;
} else {
  data.document_types = "";
}

    await propertyModules.updateProperty(id, updatedData);
    res.status(200).json({ success: true, message: "Property updated successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete property
export const deleteProperty = async (req, res) => {
  try {
    await propertyModules.deleteProperty(req.params.id);
    res.status(200).json({ success: true, message: "Property deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

import { pool } from "../utils/db.js";

// Create a new property listing
export const createProperty = (data) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO property_listings (
        owner_name, email, phone, alternate_phone,
        property_type, property_title, address, city, state, pincode,
        area, area_unit, bedrooms, bathrooms, floors, balconies, furnishing,
        office_type, floor_number, total_floors, cabin_rooms, meeting_rooms, workstations,
        property_age, expected_price, negotiable, possession, parking,
        description, has_documents, amenities, document_types
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      data.owner_name, data.email, data.phone, data.alternate_phone,
      data.property_type, data.property_title, data.address, data.city, data.state, data.pincode,
      data.area, data.area_unit, data.bedrooms, data.bathrooms, data.floors, data.balconies, data.furnishing,
      data.office_type, data.floor_number, data.total_floors, data.cabin_rooms, data.meeting_rooms, data.workstations,
      data.property_age, data.expected_price, data.negotiable, data.possession, data.parking,
      data.description, data.has_documents,
      Array.isArray(data.amenities) ? data.amenities.join(",") : (typeof data.amenities === "string" ? data.amenities : ""),
      Array.isArray(data.document_types) ? data.document_types.join(",") : (typeof data.document_types === "string" ? data.document_types : "")
    ];

    pool.query(sql, values, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};


// Get all properties
export const getAllProperties = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM property_listings ORDER BY created_at DESC", (err, results) => {
      if (err) return reject(err);

      // Convert comma-separated strings back to arrays
      const formatted = results.map((row) => ({
        ...row,
        amenities: row.amenities ? row.amenities.split(",") : [],
        document_types: row.document_types ? row.document_types.split(",") : []
      }));

      resolve(formatted);
    });
  });
};

// Get single property by ID
export const getPropertyById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM property_listings WHERE id = ?", [id], (err, result) => {
      if (err) return reject(err);

      const property = result[0];
      if (property) {
        property.amenities = property.amenities ? property.amenities.split(",") : [];
        property.document_types = property.document_types ? property.document_types.split(",") : [];
      }

      resolve(property);
    });
  });
};

// Update property listing
export const updateProperty = (id, data) => {
  return new Promise((resolve, reject) => {
    // Convert array fields to comma-separated strings if they exist
    if (Array.isArray(data.amenities)) {
      data.amenities = data.amenities.join(",");
    }
    if (Array.isArray(data.document_types)) {
      data.document_types = data.document_types.join(",");
    }

    const fields = Object.keys(data).map((key) => `${key} = ?`).join(", ");
    const values = [...Object.values(data), id];

    const sql = `UPDATE property_listings SET ${fields}, created_at = CURRENT_TIMESTAMP WHERE id = ?`;

    pool.query(sql, values, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Delete property
export const deleteProperty = (id) => {
  return new Promise((resolve, reject) => {
    pool.query("DELETE FROM property_listings WHERE id = ?", [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

import pool from "../config/db.js";

// 🏷 Amenity Modules
export const createAmenity = (property_id, amenity) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO property_amenities (property_id, amenity) VALUES (?, ?)`;
    pool.query(sql, [property_id, amenity], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

export const getAmenitiesByPropertyId = (property_id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM property_amenities WHERE property_id = ?`;
    pool.query(sql, [property_id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

export const deleteAmenity = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM property_amenities WHERE id = ?`;
    pool.query(sql, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// 📄 Document Modules
export const createDocument = (property_id, document_type) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO property_documents (property_id, document_type) VALUES (?, ?)`;
    pool.query(sql, [property_id, document_type], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

export const getDocumentsByPropertyId = (property_id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM property_documents WHERE property_id = ?`;
    pool.query(sql, [property_id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

export const deleteDocument = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM property_documents WHERE id = ?`;
    pool.query(sql, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

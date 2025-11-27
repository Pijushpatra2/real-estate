import { pool } from "../utils/db.js";

// Get all properties with city data
// export const getAllProperties = () => {
//   return new Promise((resolve, reject) => {
//     const sql = `
//       SELECT p.*, c.name AS city_name, c.cityImage
//       FROM property_dtls p
//       JOIN cities c ON p.city_id = c.id
//       ORDER BY p.created_at DESC
//     `;
//     console.log("Executing SQL:", sql);
//     pool.query(sql, (err, results) => {
//       if (err) {
//         console.error("Error fetching all properties:", err);
//         return reject(err);
//       }
//       console.log("Fetched properties count:", results.length);
//       resolve(results);
//     });
//   });
// };


// Get all properties with optional filters: type, exclude, limit
export const getAllProperties = ({ type, exclude, limit }) => {
  return new Promise((resolve, reject) => {
    let sql = `
      SELECT p.*, c.name AS city_name, c.cityImage
      FROM property_dtls p
      JOIN cities c ON p.city_id = c.id
      WHERE 1 = 1
    `;

    const params = [];

    if (type) {
      sql += " AND LOWER(p.prop_type) = ?";
      params.push(type.toLowerCase());
    }

    if (exclude) {
      sql += " AND p.property_id != ?";
      params.push(Number(exclude));
    }

    sql += " ORDER BY p.created_at DESC";

    if (limit) {
      sql += " LIMIT ?";
      params.push(Number(limit));
    }

    console.log("Executing SQL:", sql, "with params:", params);

    pool.query(sql, params, (err, results) => {
      if (err) {
        console.error("Error fetching properties:", err);
        return reject(err);
      }
      console.log("Fetched properties count:", results.length);
      resolve(results);
    });
  });
};






// Get a single property by property_id
export const getPropertyById = (property_id) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT p.*, c.name AS city_name
      FROM property_dtls p
      JOIN cities c ON p.city_id = c.id
      WHERE p.property_id = ?
    `;
    console.log("Executing SQL:", sql, "With property_id:", property_id);
    pool.query(sql, [property_id], (err, results) => {
      if (err) {
        console.error("Error fetching property by ID:", err);
        return reject(err);
      }
      console.log("Fetched property:", results[0]);
      resolve(results[0] || null);
    });
  });
};

// Create a new property
export const createProperty = (data) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO property_dtls (
        city_id, prop_title, prop_type, prop_status, prop_desc, prop_lebel,
        sale_rent_price, second_price, prop_bedrooms, prop_rooms, prop_bathrooms,
        prop_car_park, prop_garage, prop_year_built, prop_image, prop_area_size,
        prop_land_area, prop_land_size, prop_status_for_admin, location_map_link,
        area_location, nearest_prime_location
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      data.city_id,
      data.prop_title,
      data.prop_type,
      data.prop_status,
      data.prop_desc,
      data.prop_lebel,
      data.sale_rent_price,
      data.second_price,
      data.prop_bedrooms,
      data.prop_rooms,
      data.prop_bathrooms,
      data.prop_car_park,
      data.prop_garage,
      data.prop_year_built,
      data.prop_image,
      data.prop_area_size,
      data.prop_land_area,
      data.prop_land_size,
      data.prop_status_for_admin,
      data.location_map_link,
      data.area_location,
      data.nearest_prime_location
    ];
    console.log("Executing INSERT with values:", values);
    pool.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error inserting property:", err);
        return reject(err);
      }
      console.log("Property created with property_id:", result.insertId);
      resolve(result.insertId);
    });
  });
};

// Update property by property_id
export const updateProperty = (property_id, data) => {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE property_dtls SET
        city_id = ?, prop_title = ?, prop_type = ?, prop_status = ?, prop_desc = ?, prop_lebel = ?,
        sale_rent_price = ?, second_price = ?, prop_bedrooms = ?, prop_rooms = ?, prop_bathrooms = ?,
        prop_car_park = ?, prop_garage = ?, prop_year_built = ?, prop_image = ?, prop_area_size = ?,
        prop_land_area = ?, prop_land_size = ?, prop_status_for_admin = ?, location_map_link = ?,
        area_location = ?, nearest_prime_location = ?
      WHERE property_id = ?
    `;
    const values = [
      data.city_id,
      data.prop_title,
      data.prop_type,
      data.prop_status,
      data.prop_desc,
      data.prop_lebel,
      data.sale_rent_price,
      data.second_price,
      data.prop_bedrooms,
      data.prop_rooms,
      data.prop_bathrooms,
      data.prop_car_park,
      data.prop_garage,
      data.prop_year_built,
      data.prop_image,
      data.prop_area_size,
      data.prop_land_area,
      data.prop_land_size,
      data.prop_status_for_admin,
      data.location_map_link,
      data.area_location,
      data.nearest_prime_location,
      property_id
    ];
    console.log("Executing UPDATE with values:", values);
    pool.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error updating property:", err);
        return reject(err);
      }
      console.log("Property updated. Rows affected:", result.affectedRows);
      resolve(result);
    });
  });
};

// Delete property by property_id
export const deleteProperty = (property_id) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM property_dtls WHERE property_id = ?`;
    console.log("Executing DELETE with property_id:", property_id);
    pool.query(sql, [property_id], (err, result) => {
      if (err) {
        console.error("Error deleting property:", err);
        return reject(err);
      }
      console.log("Property deleted. Rows affected:", result.affectedRows);
      resolve(result);
    });
  });
};


export const getPropertiesGroupedByCity = () => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
        c.id AS city_id,
        c.name AS city_name,
        c.cityImage,
        COUNT(p.property_id) AS total_properties
      FROM cities c
      LEFT JOIN property_dtls p ON c.id = p.city_id
      GROUP BY c.id
      ORDER BY c.id DESC
    `;

    pool.query(sql, async (err, cityResults) => {
      if (err) return reject(err);

      try {
        // Fetch properties for each city
        const citiesWithProperties = await Promise.all(
          cityResults.map(city => {
            return new Promise((res, rej) => {
              const propSql = `
                SELECT 
                  property_id, prop_title, prop_type, sale_rent_price, prop_image 
                FROM property_dtls 
                WHERE city_id = ?
              `;
              pool.query(propSql, [city.city_id], (err, props) => {
                if (err) return rej(err);
                res({
                  ...city,
                  properties: props
                });
              });
            });
          })
        );

        resolve(citiesWithProperties);
      } catch (nestedErr) {
        reject(nestedErr);
      }
    });
  });
};


export const getPropertiesByCityId = (city_id) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
        c.id AS city_id,
        c.name AS city_name,
        c.cityImage,
        p.*
      FROM property_dtls p
      JOIN cities c ON p.city_id = c.id
      WHERE c.id = ?
      ORDER BY p.created_at DESC
    `;
    pool.query(sql, [city_id], (err, results) => {
      if (err) {
        console.error("Error fetching properties by city:", err);
        return reject(err);
      }
      resolve(results);
    });
  });
};
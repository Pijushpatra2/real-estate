// import mysql from "mysql";
import mysql from "mysql";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const pool = mysql.createPool({
  connectionLimit: process.env.DB_CONNECTION_LIMIT || 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test the connection and log a success or error message
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
  } else {
    console.log("Connected to the MySQL database.");
    connection.release(); // Release the connection back to the pool
  }
});

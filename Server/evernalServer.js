import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";


import adminAuthRoutes from "./routes/adminAuthRoute.js"
import blogRoutes from "./routes/blogRoutes.js";
import contactFormRoutes from "./routes/contactFormRoutes.js";


import citiesRoutes from "./routes/citiesRoute.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import propAminitiesRoutes from "./routes/propAminitiesRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";
import propMediaRoutes from "./routes/propMediaRoutes.js";
import propFloorPlanRoutes from "./routes/propFloorPlanRoutes.js";
import listingPropRoutes from "./routes/listingPropRoutes.js";


import morgan from "morgan";
import { fileURLToPath } from "url"; 
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.send("Evernal Backend is running properly.");
});

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes should come first

// // API routes for admin
app.use("/api/v1/admin/auth", adminAuthRoutes);
app.use("/api/v1/blog", blogRoutes);
app.use("/api/v1/contact", contactFormRoutes);

// // API routes for cities
app.use("/api/v1/cities", citiesRoutes);
app.use('/api/v1/properties', propertyRoutes);
app.use('/api/v1/aminities', propAminitiesRoutes);
app.use("/api/v1/locations", locationRoutes);
// // API routes for property media
app.use("/api/v1/media", propMediaRoutes);
app.use("/api/v1/floor-plans",propFloorPlanRoutes);

// API routes for listing property
app.use("/api/v1/listing", listingPropRoutes);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

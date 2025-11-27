import multer from "multer";
import path from "path";
import fs from "fs";

// Generate relative path for DB storage
const generateFilePath = (folderName, fileName) => {
  return `/uploads/${folderName}/${fileName}`;
};

// Create multer disk storage
const createStorage = (folderName) => multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join("uploads", folderName);
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext).replace(/\s+/g, "-");
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${baseName}${ext}`;
    cb(null, uniqueName);
  },
});

// Validate image mimetypes
const imageFileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  allowed.includes(file.mimetype)
    ? cb(null, true)
    : cb(new Error("Only image files are allowed"), false);
};

// 🔹 SINGLE FILE UPLOAD
const generateSingleUpload = ({ folderName, fieldName, maxSizeMB = 5 }) => {
  const upload = multer({
    storage: createStorage(folderName),
    fileFilter: imageFileFilter,
    limits: { fileSize: maxSizeMB * 1024 * 1024 },
  }).single(fieldName);

  return (req, res, next) => {
    upload(req, res, (err) => {
      if (err) return next(err);
      if (req.file) {
        req.file.dbPath = generateFilePath(folderName, req.file.filename); // Attach relative path
      }
      next();
    });
  };
};

// 🔹 MULTIPLE FILE UPLOAD
const generateMultipleUpload = ({ folderName, fieldName, maxCount = 20, maxSizeMB = 10 }) => {
  const upload = multer({
    storage: createStorage(folderName),
    fileFilter: imageFileFilter,
    limits: {
      fileSize: maxSizeMB * 1024 * 1024,
      files: maxCount,
    },
  }).array(fieldName, maxCount);

  return (req, res, next) => {
    upload(req, res, (err) => {
      if (err) return next(err);
      if (req.files) {
        req.files.forEach(file => {
          file.dbPath = generateFilePath(folderName, file.filename); // Attach relative path
        });
      }
      next();
    });
  };
};

//
// ✅ EXPORT MIDDLEWARES
//

export const handleCityImageUpload = generateSingleUpload({
  folderName: "cities",
  fieldName: "cityImage",
  maxSizeMB: 5,
});

export const handlePropertyImageUpload = generateSingleUpload({
  folderName: "properties",
  fieldName: "prop_image",
  maxSizeMB: 10,
});

export const handlePropertyGalleryUpload = generateSingleUpload({
  folderName: "property-gallery",
  fieldName: "gallery_img",
  maxSizeMB: 10,
});

export const handleMultiplePropertyGalleryUpload = generateMultipleUpload({
  folderName: "property-gallery",
  fieldName: "gallery_images",
  maxCount: 20,
  maxSizeMB: 10,
});

export const handleFloorPlanImageUpload = generateSingleUpload({
  folderName: "floor-plans",
  fieldName: "floor_img",
  maxSizeMB: 10,
});

// 🔹 BLOG MULTI-FIELD UPLOAD
export const blogUpload = multer({
  storage: createStorage("blogs"),
  fileFilter: imageFileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB per file
});
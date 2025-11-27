import {
  getMediaByPropertyId,
  addMedia,
  bulkInsertMedia,
  deleteMedia,
} from "../modules/propMediaModules.js";

// @desc   Get media by property ID
export const handleGetMediaByPropertyId = async (req, res) => {
  try {
    const prop_id = req.params.prop_id;
    const data = await getMediaByPropertyId(prop_id);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching property media:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// @desc   Upload a single media entry (file upload + DB insert)
export const handleAddMedia = async (req, res) => {
  try {
    const { prop_id } = req.body;
    const img_path = req.file?.dbPath;  // Use the relative path attached by middleware

    if (!prop_id || !img_path) {
      return res.status(400).json({ error: "prop_id and image file are required" });
    }

    const insertedId = await addMedia({ prop_id, img_name: img_path });
    res.status(201).json({ message: "Media uploaded successfully", id: insertedId, img_name: img_path });
  } catch (error) {
    console.error("Error uploading media:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// @desc   Bulk insert media entries (file uploads + DB insert)
export const handleBulkInsertMedia = async (req, res) => {
  try {
    const { prop_id } = req.body;
    const files = req.files;

    console.log("Received prop_id:", prop_id);
    console.log("Uploaded files:", files);

    if (!prop_id || !files || files.length === 0) {
      return res.status(400).json({ error: "prop_id and images are required" });
    }

    const mediaList = files.map(file => ({
      prop_id,
      img_name: file.dbPath,  // Use relative path for each file
    }));

    const result = await bulkInsertMedia(mediaList);
    res.status(201).json({ message: "Multiple media uploaded", inserted: result.affectedRows });
  } catch (error) {
    console.error("Error in handleBulkInsertMedia:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// @desc   Delete a media entry by ID
export const handleDeleteMedia = async (req, res) => {
  try {
    const media_id = req.params.media_id;
    const result = await deleteMedia(media_id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Media not found" });
    }

    res.status(200).json({ message: "Media deleted successfully" });
  } catch (error) {
    console.error("Error deleting media:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

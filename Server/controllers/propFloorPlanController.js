import {
  getFloorPlansByPropertyId,
  addFloorPlan,
  updateFloorPlan,
  deleteFloorPlan,
} from "../modules/propFloorPlanModules.js";

// @desc   Get all floor plans for a property
export const handleGetFloorPlans = async (req, res) => {
  try {
    const { prop_id } = req.params;
    const data = await getFloorPlansByPropertyId(prop_id);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching floor plans:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// @desc   Add a new floor plan
export const handleAddFloorPlan = async (req, res) => {
  try {
    const { prop_id, floor_name, floor_price, floor_size } = req.body;
    const floor_img = req.file?.dbPath;

    if (!prop_id || !floor_name || !floor_price || !floor_size || !floor_img) {
      return res.status(400).json({ error: "All fields including image are required" });
    }

    const insertedId = await addFloorPlan({
      prop_id,
      floor_name,
      floor_price,
      floor_size,
      floor_img,
    });

    res.status(201).json({ message: "Floor plan added", id: insertedId });
  } catch (error) {
    console.error("Error adding floor plan:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// @desc   Update floor plan
export const handleUpdateFloorPlan = async (req, res) => {
  try {
    const { floor_plan_id } = req.params;
    const { floor_name, floor_price, floor_size } = req.body;
    const floor_img = req.file?.dbPath;

    const result = await updateFloorPlan({
      floor_plan_id,
      floor_name,
      floor_price,
      floor_size,
      floor_img,
    });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Floor plan not found or not updated" });
    }

    res.status(200).json({ message: "Floor plan updated" });
  } catch (error) {
    console.error("Error updating floor plan:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// @desc   Delete floor plan
export const handleDeleteFloorPlan = async (req, res) => {
  try {
    const { floor_plan_id } = req.params;
    const result = await deleteFloorPlan(floor_plan_id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Floor plan not found" });
    }

    res.status(200).json({ message: "Floor plan deleted" });
  } catch (error) {
    console.error("Error deleting floor plan:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

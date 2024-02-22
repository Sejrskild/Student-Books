import School from "../models/School.js";

// This feature is not implemented yet, and won't be for a while.
export const getSchools = async (req, res) => {
  try {
    const schools = await School.find({});
    res.status(200).json({ schools });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

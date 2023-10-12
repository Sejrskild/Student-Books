import School from "../models/School.js";

export const getSchools = async (req, res) => {
  try {
    const schools = await School.find({});
    res.status(200).json({ schools });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

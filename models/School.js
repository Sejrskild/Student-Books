import mongoose from "mongoose";

const SchoolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    address: {
      type: String,
    },
    zip: {
      type: Number,
    },
    city: {
      type: String,
    },
    logo: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("School", SchoolSchema);

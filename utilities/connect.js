import mongoose from "mongoose";

// Used to connect to MongoDB
const connectToDB = (url) => {
  return mongoose.connect(url);
};

export default connectToDB;

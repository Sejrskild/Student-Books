import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

// Database
import connectToDB from "./utilities/connect.js";

const PORT = 3000 || process.env.PORT;
const app = express();

// Routes
import userRoutes from "./routes/userRoutes.js";
import schoolRoutes from "./routes/schoolRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";

// Middleware
import authenticateUser from "./middleware/authenticateUser.js";

// Middleware
app.use(express.json({ limit: "200mb" }));
app.use(bodyParser.text({ limit: "200mb" }));
app.use(cors());

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/schools", schoolRoutes);
app.use("/api/v1/items", authenticateUser, itemRoutes);

// Test Route
app.get("/api/v1/test", (req, res) => {
  res.status(200).json({
    message: "This API call works! Also this",
  });
});

const startServer = async () => {
  try {
    await connectToDB(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`Server is listening on PORT : ${PORT}..`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import eligibilityRoutes from "./routes/eligibility.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/eligibility", eligibilityRoutes);

app.get("/", (req, res) => {
  res.send("CivicBridge API running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const tripSchema = new mongoose.Schema({
  startLocation: String,
  destination: String,
  numPeople: Number,
  startDate: String,
  numDays: Number,
  budget: Number,
  currency: String,
  aiResponse: String,
});

const Trip = mongoose.model("Trip", tripSchema);

app.post("/save-trip", async (req, res) => {
  try {
    const trip = new Trip(req.body);
    await trip.save();
    res.status(201).json({ message: "Trip saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));

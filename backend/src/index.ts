import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import contactRouter from "./routes/contact-route";

const app = express();
const port = process.env.PORT || 4000;

// Mongoose setup
const mongoUrl = process.env.MONGO_URI || "mongodb://localhost:27017/contacts";

mongoose.connect(mongoUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/contacts", contactRouter);

app.use("*", (req, res) => {
  res.send("Welcome to API!");
});

// Contact routes

app.listen(port, () => {
  console.log(`Contacts API listening at ${port}`);
});

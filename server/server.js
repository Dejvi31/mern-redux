const express = require("express");
const dotenv = require("dotenv");
const notes = require("./data/notes");
const app = express();
const cors = require("cors");
dotenv.config();
const connectDB = require("./config/db");

app.use(cors());
connectDB();
app.get("/", (req, res) => {
  res.send("Hello NODE API");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const note = notes.find((n) => n._id === req.params.id);
  res.send(note);
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started at port ${PORT}`));

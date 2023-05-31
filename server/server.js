const express = require("express");
const dotenv = require("dotenv");
const notes = require("./data/notes");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();
dotenv.config();
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
app.use(express.json());

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

app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started at port ${PORT}`));

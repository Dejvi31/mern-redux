const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");

const app = express();
dotenv.config();
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
app.use(express.json());
const path = require("path");

app.use(cors());
connectDB();

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

// ------------- deployment -----------

__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client-side/build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../client-side", "build", "index.html")
    );
  });
} else {
  app.get("/", (req, res) => {
    res.send("Hello NODE API");
  });
}

// -------------- deployment -------------

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started at port ${PORT}`));

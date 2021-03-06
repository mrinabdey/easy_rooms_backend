const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const authRoutes = require("./routes/auth");
const featuresRoutes = require("./routes/features");
const userRoutes = require("./routes/user");
const port = process.env.PORT || 4000;

app.use(cors());
// app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/auth", authRoutes);
app.use("/features", featuresRoutes);
app.use("/user", userRoutes);

app.use("/auth", authRoutes);
app.use("/features", featuresRoutes);
app.use("/user", userRoutes);

mongoose.connect(
  "mongodb+srv://andrew:tyrex123@cluster0.cusk3.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;

db.on("error", () => {
  console.log("Connection Error!");
});

db.once("open", () => {
  app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
  });
});

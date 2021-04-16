const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const upload = multer();

const app = express();
const errorController = require("./controller/error.controller");
const psychiatristRoutes = require("./routes/psyhciatrist.routes");
const patientRoutes = require("./routes/patient.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(upload.array());
app.use(morgan("dev"));

app.use("/api/v1/psychiatrist", psychiatristRoutes);
app.use("/api/v1/patient", patientRoutes);

app.use(errorController);

module.exports = app;

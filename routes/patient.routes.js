const express = require("express");
const router = express.Router();
const {
  createPatient,
  updatePatient,
  deletePatient,
  uploadImg,
} = require("../controller/patient.controller");

router.post("/create", uploadImg, createPatient);
router.patch("/update/:id", updatePatient);
router.delete("/delete/:id", deletePatient);

module.exports = router;

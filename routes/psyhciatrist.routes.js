const express = require("express");
const router = express.Router();
const {
  createPsychiatrist,
  getPatients,
  getPatientsAndPsychiatrists
} = require("../controller/psychiatrist.controller");

// router.get("/");
router.post("/create", createPsychiatrist);
router.get("/:id/patients", getPatients);
router.get("/getDetails", getPatientsAndPsychiatrists);

module.exports = router;

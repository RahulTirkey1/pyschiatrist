const Patient = require("../model/patient");
const { errorHandler } = require("../utils/errorHandler");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

exports.uploadImg = multer({ storage }).single("photo");

exports.createPatient = async (req, res, next) => {
  try {
    const patientExists = await Patient.findOne({ email: req.body.email });
    if (patientExists) {
      return next(errorHandler("Patient already exists", "fail", 400));
    }

    const patient = await Patient.create({
      ...req.body,
      photo: req.file.path,
    });
    res.status(201).json({
      status: "success",
      data: {
        patient,
      },
    });
  } catch (error) {
    return next(errorHandler(error.message));
  }
};

exports.updatePatient = async (req, res, next) => {
  try {
    const { id } = req.params;
    let patient;
    if (req.body.password) {
      patient = await Patient.findById(id).select("+password");
    } else {
      patient = await Patient.findById(id);
    }
    if (!patient) {
      return next(errorHandler("Patient doesn't exist", "fail", 404));
    }
    for (let field in req.body) {
      patient[field] = req.body[field];
    }
    await patient.save();
    patient.password = undefined;
    res.status(200).json({
      status: "success",
      data: {
        patient,
      },
    });
  } catch (error) {
    return next(errorHandler(error.message));
  }
};

exports.deletePatient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findByIdAndDelete(id);
    if (!patient) {
      return next(errorHandler("Patient doesn't exist", "fail", 404));
    }
    res.status(204).json({
      status: "success",
      data: {
        message: 'patient removed from db'
      }
    });
  } catch (error) {
    return next(errorHandler(error.message));
  }
};

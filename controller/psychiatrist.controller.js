const Psychiatrist = require("../model/psychiatrist");
const Patient = require("../model/patient");
const { errorHandler } = require("../utils/errorHandler");

exports.createPsychiatrist = async (req, res, next) => {
  try {
    const psychiatrist = await Psychiatrist.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        psychiatrist,
      },
    });
  } catch (error) {
    return next(errorHandler(error.message));
  }
};

exports.getPatients = async (req, res, next) => {
  try {
    const { id } = req.params;
    const patients = await Patient.find({ psychiatrist: id });
    res.status(200).json({
      status: "success",
      data: {
        patients,
      },
    });
  } catch (error) {
    return next(errorHandler(error.message));
  }
};

exports.getPatientsAndPsychiatrists = async (req, res, next) => {
  try {
    const result = await Patient.aggregate([
      {
        $group: {
          _id: "$psychiatrist",
          numOfPatients: { $sum: 1 },
        },
      },
      {
        $project: {
          psychiatrist: {
            $toObjectId: "$_id",
          },
          numOfPatients: 1,
          _id: 0,
        },
      },
      {
        $lookup: {
          from: "psychiatrists",
          localField: "psychiatrist",
          foreignField: "_id",
          as: "popPsych",
        },
      },
      { $unwind: "$popPsych" },
      {
        $project: {
          psychiatrist: 0,
          psychiatrist: {
            $concat: ["$popPsych.firstName", " ", "$popPsych.lastName"],
          },
          hospitalName: "$popPsych.hospitalName",
          numOfPatients: 1,
        },
      },
    ]);
    res.status(200).json({
      status: "success",
      data: {
        result,
      },
    });
  } catch (error) {
    return next(errorHandler(error.message));
  }
};

const mongoose = require("mongoose");
const customValidator = require("validator");
const {Schema} =mongoose

const psychiatristSchema = new Schema(
  {
    firstName: {
      type: String,
      maxLength: [20, "FirstName should be max 20 characters"],
      required: true,
    },
    lastName: {
      type: String,
      maxLength: [20, "LastName should be max 20 characters"],
      required: true,
    },
    hospitalName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      validate: {
        validator: function (v) {
          return customValidator.isMobilePhone(v, "en-IN");
        },
        message: (v) => "enter a valid phone number",
      },
    },
    pincode: String,
    state: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Psychiatrist", psychiatristSchema);

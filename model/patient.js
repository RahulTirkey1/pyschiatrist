const mongoose = require("mongoose");
const customValidator = require("validator");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const patientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [3, "Name should be atleast 3 characters"],
    },
    address: {
      type: String,
      required: true,
      minLength: [10, "Name should be atleast 10 characters"],
    },
    email: {
      type: String,
      lowercase: true,
      validate: [customValidator.isEmail, "Enter a valid email"],
    },
    phoneNumber: {
      type: String,
      minLength: [10, "Phone number should be atleast 10 digits"],
      validate: {
        validator: function (v) {
          return customValidator.isMobilePhone(v, "en-IN");
        },
        message: (v) => "enter a valid phone number",
      },
    },
    password: {
      type: String,
      validate: {
        validator: function (v) {
          return (
            /^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/.test(v) &&
            v.length >= 8 &&
            v.length <= 15
          );
        },
        message: () =>
          "Password should have atleast 1 uppercase,1 lowercase and a number.it should have minimum 8 characters and max 15 characters",
      },
      select: false,
    },
    photo: {
      type: String,
      required: true,
    },
    psychiatrist: {
      type: Schema.Types.ObjectId,
      ref: "Psychiatrist",
    },
  },
  { timestamps: true }
);

patientSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model("Patient", patientSchema);

const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    vehicleMake: {
      type: String,
      required: true,
    },
    vehicleModel: {
      type: String,
      required: true,
    },
    registrationNumber: {
      type: String,
      required: true,
    },
    moreInfo: {
      type: String,
      required: false,
    },
    fuel: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("car", carSchema);

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
      unique: true,
    },
    imageUrl: {
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
    price: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    regExpiration: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
          return dateRegex.test(value.toISOString().split("T")[0]);
        },
        message: (props) =>
          `${props.value} is not a valid date! Date must be in format YYYY-MM-DD`,
      },
    },
    rentedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Car", carSchema);

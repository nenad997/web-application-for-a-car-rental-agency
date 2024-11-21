import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    vehicleMake: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    vehicleModel: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    registrationNumber: {
      type: mongoose.Schema.Types.String,
      required: true,
      unique: true,
    },
    image: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    moreInfo: {
      type: mongoose.Schema.Types.String,
      required: false,
    },
    fuel: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    price: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    available: {
      type: mongoose.Schema.Types.Boolean,
      default: true,
    },
    regExpiration: {
      type: mongoose.Schema.Types.Date,
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
    rentedAt: {
      type: mongoose.Schema.Types.Date,
      default: null,
    },
    initialPrice: {
      type: mongoose.Schema.Types.String,
    },
  },
  {
    timestamps: true,
  }
);

carSchema.pre("save", function (next) {
  if (!this.initialPrice) {
    this.initialPrice = this.price;
  }
  next();
});

export default mongoose.model("Car", carSchema);

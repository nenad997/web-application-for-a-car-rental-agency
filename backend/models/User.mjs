import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: mongoose.Schema.Types.String,
      required: true,
      unique: true,
    },
    username: {
      type: mongoose.Schema.Types.String,
      required: true,
      unique: true,
    },
    id_card_number: {
      type: mongoose.Schema.Types.String,
      required: true,
      unique: true,
    },
    password: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    rentedCars: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

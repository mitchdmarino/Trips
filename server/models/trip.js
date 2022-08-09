const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    packing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Items",
    },
    destination: {
      type: String,
      required: true,
    },
    days: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Trip", TripSchema);

const mongoose = require("mongoose");

const ItemsSchema = new mongoose.Schema(
  {
    basics: [
      {
        type: String,
      },
    ],
    miscellaneous: [
      {
        type: String,
      },
    ],
    clothes: [
      {
        type: String,
        quantity: Number,
      },
    ],
    hygiene: [
      {
        type: String,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Items", ItemsSchema);

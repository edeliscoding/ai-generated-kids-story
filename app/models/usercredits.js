const mongoose = require("mongoose");

const userCreditsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  creditsPurchased: {
    type: Number, // Credits purchased by the user
    required: true,
  },
  creditsUsed: {
    type: Number, // Credits that have been spent
    default: 0,
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("UserCredits", userCreditsSchema);

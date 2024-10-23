const mongoose = require("mongoose");

const userCreditsSchema = new mongoose.Schema({
  clerkId: { type: String, unique: true },
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
const UserCredits =
  mongoose.models.UserCredits ||
  mongoose.model("UserCredits", userCreditsSchema);

export default UserCredits;

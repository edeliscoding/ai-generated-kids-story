const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  clerkId: { type: String, required: true },
  stripePaymentId: {
    type: String, // The ID of the Stripe payment
    required: true,
  },
  priceId: {
    type: String, // The ID of the price in Stripe
    required: true,
  },
  amount: {
    type: Number, // Amount paid in the transaction
    required: true,
  },
  currency: {
    type: String, // Currency of the transaction (e.g., 'USD')
    required: true,
  },
  status: {
    type: String, // Payment status (e.g., 'pending', 'completed', 'failed')
    required: true,
  },
  creditsAdded: {
    type: Number, // Credits added to the user after successful payment
    default: 0,
  },
  refundedAt: {
    type: Date, // Date when the payment was refunded
    default: null, // Set to null if not refunded
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Payment =
  mongoose.models.Payment || mongoose.model("Payment", paymentSchema);

export default Payment;

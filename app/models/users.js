import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    clerkId: { type: String, unique: true, required: true },
    userName: String,
    userEmail: String,
    userImage: String,
    credit: { type: Number, default: 2 },
    stripeCustomerId: {
      type: String,
      unique: true,
      sparse: true, // Populated when user pays with Stripe
    },
    paypalCustomerId: {
      type: String,
      unique: true,
      sparse: true, // Populated when user pays with PayPal
    },
    paymentMethods: [
      {
        provider: {
          type: String, // 'stripe' or 'paypal'
        },
        paymentMethodId: {
          type: String, // The method ID for Stripe or PayPal
        },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;

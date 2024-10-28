// // Assume we are now in the /api/success route
// export async function POST(req) {
//   const { session_id } = await req.json(); // Get session_id from the request
//   const session = await stripe.checkout.sessions.retrieve(session_id);

//   const paymentIntentId = session.payment_intent; // Transaction ID from Stripe

//   // Check if the user already has a payment record (for future purchases)
//   let payment = await Payment.findOne({
//     userId: session.metadata.userIdMongo,
//     transactionId: paymentIntentId, // Will be null for first-time purchases initially
//   });

//   if (!payment) {
//     // Create a new payment record since this is the first time
//     payment = new Payment({
//       userId: session.metadata.userIdMongo,
//       transactionId: paymentIntentId, // Now available from Stripe
//       amount: session.amount_total / 100, // Amount in dollars
//       currency: session.currency,
//       provider: "stripe", // or 'paypal' dynamically
//       status: session.payment_status, // 'paid', 'pending', etc.
//       creditsAdded: parseInt(session.metadata.credits), // Credits from the metadata
//     });

//     await payment.save(); // Save the new payment record in the database
//   } else {
//     // Update the existing payment record if it already exists (e.g., subsequent payments)
//     await Payment.findOneAndUpdate(
//       {
//         userId: session.metadata.userIdMongo,
//         transactionId: paymentIntentId,
//       },
//       {
//         status: session.payment_status, // Update status if needed
//         creditsAdded: parseInt(session.metadata.credits), // Update credits if necessary
//       },
//       { new: true }
//     );
//   }

//   return NextResponse.json({
//     message: "Payment processed successfully",
//     payment,
//   });
// }
import { NextResponse } from "next/server";
import Stripe from "stripe";
import Payment from "@/app/models/payment";
import User from "@/app/models/users";
import dbConnect from "@/app/lib/mongodb";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export async function POST(req) {
  await dbConnect();

  const { session_id } = await req.json();

  try {
    // Retrieve the checkout session from Stripe using the session_id
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    const paymentIntentId = session.payment_intent;
    const amount = session.amount_total / 100; // Amount is in cents, convert it to dollars
    const currency = session.currency;
    const creditsAdded = session.metadata.credits;
    const provider = session.metadata.provider || "stripe"; // Default to Stripe

    // Find the user who made the payment using userId from the session metadata
    let user = await User.findOne({ _id: session.metadata.userIdMongo });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Create a new payment record for this transaction
    const newPayment = new Payment({
      userId: user._id.toString(),
      transactionId: paymentIntentId, // For Stripe or PayPal, use payment intent ID as transaction ID
      amount,
      currency,
      provider,
      status: session.payment_status, // 'paid', 'pending', etc.
      creditsAdded,
    });

    // Save the payment record in the database
    await newPayment.save();

    // Update user credits after successful payment
    user.credits = user.credits + parseInt(creditsAdded);
    user.paymentMethods = [
      ...user.paymentMethods,
      {
        provider,
        paymentMethodId: paymentIntentId,
      },
    ];
    await user.save();

    return NextResponse.json(
      { success: true, payment: newPayment },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing payment:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

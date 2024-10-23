// import { NextResponse } from "next/server";
// import Stripe from "stripe";
// import { updateCredits } from "@/app/data/updateCredits"; // import your update credits logic
// import { buffer } from "micro"; // helps process raw body from stripe
// import { handleCreditsCheckoutCompleted } from "@/app/lib/payment-helpers";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export const config = {
//   api: {
//     bodyParser: false, // Stripe requires raw body parsing
//   },
// };

// export async function POST(req) {
//   const buf = await buffer(req.body);
//   const sig = req.headers.get("stripe-signature");

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       buf,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET // Ensure this secret is in your .env.local
//     );
//   } catch (err) {
//     console.error("Error verifying Stripe signature:", err.message);
//     return NextResponse.json(
//       { error: "Webhook signature verification failed" },
//       { status: 400 }
//     );
//   }

//   // Handle the event
//   if (event.type === "checkout.session.completed") {
//     const session = event.data.object;

//     // Fetch user's credits or relevant information from session metadata
//     const userId = session.metadata.userId;
//     const creditString = session.metadata.credits;
//     const credits = parseInt(creditString);
//     console.log("Webhook received - User ID:", userId, "Credits:", credits);

//     // Update the user's credits in your database
//     try {
//       await handleCreditsCheckoutCompleted({ userId, credits });
//       // 'use server';
//       //   await updateCredits(credits); // Call your updateCredits function
//       console.log("Attempting to update credits...");
//       // Make sure to pass userId if required
//       console.log(`Credits added successfully to user ${userId}`);
//     } catch (error) {
//       console.error("Error updating credits:", error);
//       // Log the full error object for more details
//       console.error(JSON.stringify(error, Object.getOwnPropertyNames(error)));
//     }
//   }

//   return NextResponse.json({ received: true });
// }
import {
  handleCreditsCheckoutCompleted,
  insertPayment,
} from "@/app/lib/payment-helpers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function POST(request) {
  const payload = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json(
      { status: "Failed", message: "No stripe signature found" },
      { status: 400 }
    );
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
    // console.log("event", event);
  } catch (err) {
    return NextResponse.json(
      { status: "Failed", message: err.message },
      { status: 400 }
    );
  }

  try {
    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;

        // Make sure we have the required metadata
        if (!session.metadata?.userId || !session.metadata?.credits) {
          throw new Error("Missing required metadata");
        }

        const userId = session.metadata.userId;
        const creditString = session.metadata.credits;
        const credits = parseInt(creditString);
        const amountPaid = (session.amount_total / 100).toFixed(2);

        // Retrieve the line items, including the priceId
        const lineItems = await stripe.checkout.sessions.listLineItems(
          session.id,
          {
            expand: ["data.price.product"],
          }
        );
        // Access the priceId from the line items
        const priceId = lineItems.data[0].price.id;

        // console.log(`Price ID: ${priceId}`);

        if (isNaN(credits)) {
          throw new Error("Invalid credits value");
        }

        // console.log("Session:", session);
        // const priceId = session.line_items?.data[0].price?.id;
        // console.log("Price ID:", priceId);
        // console.log(
        //   `Processing successful payment for user ${userId} with ${credits} credits`
        // );
        // await handleCheckoutSessionCompleted({ session, stripe });
        await handleCreditsCheckoutCompleted({ userId, credits });
        // await handleCreditsCheckoutCompleted();
        await insertPayment({ userId, session, credits, priceId, amountPaid });
        break;

      case "payment_method.attached":
        const paymentMethod = event.data.object;
        // console.log("PaymentMethod was attached to a Customer!");
        break;

      default:
      // console.log(`Unhandled event type ${event.type}`);
    }

    // Return a success response
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { status: "Failed", message: error.message },
      { status: 500 }
    );
  }
}

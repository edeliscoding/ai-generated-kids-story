"use client";
import { PayPalButtons } from "@paypal/react-paypal-js";
import React, { useContext, useEffect, useState } from "react";
import PayPalButton from "../components/PayPalButton";
import { useRouter } from "next/navigation";
import { updateCredits } from "@/app/data/updateCredits";
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

// Load Stripe outside the component to avoid reloading it on each render
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
function BuyCreditsPage() {
  const { user, updateUser } = useAuth();
  console.log("user fro useAuth Context", user);
  const [provider, setProvider] = useState("stripe");

  const userIdMongo = user._id;
  const userId = user.clerkId;

  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(0);
  const [credits, setCredits] = useState(0);

  console.log("credits", credits);

  //   console.log("selectedOption", selectedOption);
  const priceOptions = [
    { id: 1, credits: 10, price: 1.99 },
    { id: 2, credits: 30, price: 3.99 },
    { id: 3, credits: 75, price: 5.99 },
    { id: 4, credits: 150, price: 9.99 },
  ];

  useEffect(() => {
    if (selectedOption != 0) {
      const userCredits = priceOptions[selectedOption - 1].credits;
      setCredits(userCredits);
    }
  }, [selectedOption]);

  // const handleSuccess = async () => {
  //   // onPaymentSuccess();
  //   await updateCredits(credits);
  //   user.credits = user.credits + credits;

  //   // router.push("/dashboard");
  //   toast.success("Credits added successfully");
  // };
  const handleSuccess = async () => {
    setProvider("paypal");
    try {
      await updateCredits(credits);
      updateUser({ credit: user.credit + credits });
      router.push("/dashboard");
      toast.success("Credits added successfully");
    } catch (error) {
      console.error("Error updating credits:", error);
      toast.error("Failed to add credits");
    }
  };

  const handleStripeCheckout = async () => {
    setProvider("stripe");
    try {
      const stripe = await stripePromise;
      const price = priceOptions[selectedOption - 1].price;

      // Call the backend API to create the Checkout session
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price, userId, credits, userIdMongo, provider }),
      });

      const session = await response.json();
      // if (response.status == 200) {
      //   await updateCredits(credits);
      //   updateUser({ credit: user.credit + credits });
      // }

      if (!session.id) {
        throw new Error("No session ID returned from Stripe");
      }
      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        toast.error(result.error.message);
      }
    } catch (error) {
      console.error("Error updating credits:", error);
      toast.error("Failed to add credits");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-100">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-center text-3xl font-bold mb-8 text-purple-700">
          Add More Credits
        </h2>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Credit Options */}
          <div className="space-y-6">
            {priceOptions.map((option, index) => (
              <div
                onClick={() => setSelectedOption(option.id)}
                key={option.id}
                className={`cursor-pointer bg-purple-500 text-white rounded-lg p-6 text-center hover:bg-purple-700 transition-all  ${
                  selectedOption === option.id && "bg-gray-800"
                }`}
              >
                <p className="text-xl font-semibold">
                  {option.credits} Credits
                </p>
                <p className="text-3xl mt-2">${option.price}</p>
              </div>
            ))}
          </div>

          {selectedOption === 0 ? null : (
            <>
              <PayPalButton
                //   onPaymentSuccess={onPaymentSuccess}
                onSuccess={handleSuccess}
                amount={Number(priceOptions[selectedOption - 1].price).toFixed(
                  2
                )}
              />
              <button
                onClick={handleStripeCheckout}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
              >
                Pay with Stripe
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default BuyCreditsPage;

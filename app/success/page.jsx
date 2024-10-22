// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useAuth } from "@/app/context/authContext";
// import { updateCredits } from "@/app/data/updateCredits";
// import toast from "react-hot-toast";

// export default function SuccessPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const sessionId = searchParams.get("session_id");
//   const credits = parseInt(searchParams.get("credits"), 10);
//   const { user, updateUser } = useAuth();
//   const [updatedCredits, setUpdatedCredits] = useState(false);

//   // useEffect(() => {
//   //   if (sessionId && user) {
//   //     updateUser({ ...user, credit: user.credit + credits });
//   //   }
//   // }, []);
//   // useEffect(() => {
//   //   const updateUserCredits = async () => {
//   //     if (updatedCredits) return; // Prevent multiple updates

//   //     const sessionId = searchParams.get("session_id");
//   //     const credits = parseInt(searchParams.get("credits"), 10);

//   //     if (sessionId && credits && user) {
//   //       try {
//   //         // Verify the payment status with your backend
//   //         const response = await fetch(
//   //           `/api/verify-payment?session_id=${sessionId}`
//   //         );
//   //         const { success } = await response.json();

//   //         if (success) {
//   //           await updateCredits(credits);
//   //           updateUser({ credit: user.credit + credits });
//   //           setUpdatedCredits(true);
//   //           toast.success("Credits added successfully");
//   //         } else {
//   //           toast.error("Payment verification failed");
//   //         }
//   //       } catch (error) {
//   //         console.error("Error updating credits:", error);
//   //         toast.error("Failed to update credits");
//   //       }
//   //     }
//   //   };

//   //   updateUserCredits();
//   // }, []);

//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center">
//       <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
//       {/* <p className="text-lg mb-4">
//         {updatedCredits
//           ? "Your credits have been updated."
//           : "Your credits will be updated shortly."}
//       </p> */}
//       <button
//         onClick={() => router.push("/dashboard")}
//         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//       >
//         Go to Dashboard
//       </button>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/context/authContext";
import toast from "react-hot-toast";

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, updateUser } = useAuth();
  const [updatedCredits, setUpdatedCredits] = useState(false);

  // useEffect(() => {
  //   const updateUserCredits = async () => {
  //     if (updatedCredits) return;

  //     const sessionId = searchParams.get("session_id");

  //     if (sessionId && user) {
  //       try {
  //         const response = await fetch("/api/update-credits", {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({ sessionId }),
  //         });

  //         const { success, credits } = await response.json();

  //         if (success) {
  //           updateUser({ credit: user.credit + credits });
  //           setUpdatedCredits(true);
  //           toast.success("Credits added successfully");
  //         } else {
  //           toast.error("Failed to update credits");
  //         }
  //       } catch (error) {
  //         console.error("Error updating credits:", error);
  //         toast.error("An error occurred while updating credits");
  //       }
  //     }
  //   };

  //   updateUserCredits();
  // }, [user, searchParams, updateUser, updatedCredits]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
      {/* <p className="text-lg mb-4">
        {updatedCredits
          ? "Your credits have been updated."
          : "Your credits will be updated shortly."}
      </p> */}
      <button
        onClick={() => router.push("/dashboard")}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Go to Dashboard
      </button>
    </div>
  );
}

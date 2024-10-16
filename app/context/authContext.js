"use client";
// import { useUser } from "@clerk/nextjs";
// import axios from "axios";

// import { useState } from "react";
// import { createContext, useEffect } from "react";
// import { getCurrentUser } from "../data/getCurrentUser";
// import { createUser } from "../data/createUser";

// export const AuthContext = createContext();

// export const AuthContextProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   //   console.log("currentUser", currentUser);
//   const [error, setError] = useState(null);

//   const { user: userFromClerk } = useUser();

//   const fromContext = "from context";
//   const userData = {
//     userEmail: userFromClerk?.primaryEmailAddress?.emailAddress,
//     userName: userFromClerk?.fullName,
//     userImage: userFromClerk?.imageUrl,
//   };

//   //   const saveNewIfNotExist = async () => {
//   //     try {
//   //       const existingUser = await getCurrentUser(
//   //         userFromClerk.emailAddresses[0].emailAddress
//   //       );
//   //       console.log("existingUser", existingUser);

//   //       if (!existingUser) {
//   //         console.log("No User found");
//   //         const newUser = await createUser(userData);
//   //         console.log("newUser created", newUser);

//   //         // Use a callback to log the new state immediately
//   //         setCurrentUser((prevUser) => {
//   //           console.log("Setting current user to:", newUser);
//   //           console.log("Previous user was:", prevUser);
//   //           return newUser;
//   //         });
//   //         // Add a timeout to check the state after a short delay
//   //         setTimeout(() => {
//   //           console.log("Current user after timeout:", currentUser);
//   //         }, 100);
//   //       } else {
//   //         setCurrentUser(existingUser);
//   //         console.log("existing user set", existingUser);
//   //       }
//   //     } catch (err) {
//   //       setError(err.message || "An error occurred");
//   //     }
//   //   };
//   const saveNewIfNotExist = async () => {
//     try {
//       console.log("Starting saveNewIfNotExist");
//       const existingUser = await getCurrentUser(
//         userFromClerk.emailAddresses[0].emailAddress
//       );
//       console.log("Result from getCurrentUser:", existingUser);

//       if (!existingUser) {
//         console.log("No existing user found, creating new user");
//         const newUser = await createUser(userData);
//         console.log("Result from createUser:", newUser);

//         if (!newUser) {
//           console.error("createUser returned null or undefined");
//           return;
//         }

//         console.log("New user created:", newUser);

//         setCurrentUser((prevUser) => {
//           console.log(
//             "Setting current user. Previous:",
//             prevUser,
//             "New:",
//             newUser
//           );
//           return newUser;
//         });

//         setTimeout(() => {
//           console.log("Current user after timeout:", currentUser);
//         }, 100);
//       } else {
//         console.log("Existing user found:", existingUser);
//         setCurrentUser(existingUser);
//       }

//       console.log("saveNewIfNotExist completed");
//     } catch (err) {
//       console.error("Error in saveNewIfNotExist:", err);
//       setError(err.message || "An error occurred");
//     }
//   };

//   useEffect(() => {
//     if (userFromClerk) {
//       console.log("userFromClerk changed, calling saveNewIfNotExist");
//       saveNewIfNotExist();
//     }
//   }, []);
//   return (
//     <AuthContext.Provider value={{ currentUser, fromContext, setError }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
import React, { createContext, useContext } from "react";
import useUser from "@/app/hooks/useUser";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { user, loading, error } = useUser();

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

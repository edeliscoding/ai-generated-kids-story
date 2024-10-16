"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

import { useState } from "react";
import { createContext, useEffect } from "react";
import { getCurrentUser } from "../data/getCurrentUser";
import { createUser } from "../data/createUser";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  //   console.log("currentUser", currentUser);
  const [error, setError] = useState(null);

  const { user: userFromClerk } = useUser();

  const userData = {
    userEmail: userFromClerk?.primaryEmailAddress?.emailAddress,
    userName: userFromClerk?.fullName,
    userImage: userFromClerk?.imageUrl,
  };
  // const saveNewIfNotExist = async () => {
  //   try {
  //     const user = await currentUser(); // Get the authenticated user
  //     if (!user) {
  //       throw new Error("Unauthenticated");
  //     }

  //     const existingUser = await getCurrentUser(user.emailAddresses[0].emailAddress);

  //     if (!existingUser) {
  //       const newUser = await createUser(userData);
  //       setCurrentUser(newUser);
  //       console.log("newUser created", newUser);
  //     } else {
  //       setCurrentUser(existingUser);
  //       console.log("existing user", existingUser);
  //     }
  //   } catch (err) {
  //     setError(err.message || "An error occurred");
  //   }
  // };

  const saveNewIfNotExist = async () => {
    try {
      //   const user = await currentUser(); // Get the authenticated user
      //   if (!user) {
      //     throw new Error("Unauthenticated");
      //   }

      const existingUser = await getCurrentUser(
        userFromClerk.emailAddresses[0].emailAddress
      );

      if (!existingUser) {
        console.log("No User found");
        const newUser = await createUser(userData);
        setCurrentUser(newUser);
        console.log("newUser created", newUser);
      } else {
        setCurrentUser(existingUser);
        console.log("existing user", existingUser);
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    }
  };

  useEffect(() => {
    userFromClerk && saveNewIfNotExist();
    // userFromClerk && alert("from use Effect userFromClerk", userFromClerk);
  }, [userFromClerk]);

  return (
    <AuthContext.Provider value={{ currentUser, setError }}>
      {children}
    </AuthContext.Provider>
  );
};

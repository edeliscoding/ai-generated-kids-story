// "use client";

// import React, { createContext, useContext } from "react";
// import useUser from "@/app/hooks/useUser";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const { user, loading, error } = useUser();

//   return (
//     <AuthContext.Provider value={{ user, loading, error }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
"use client";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import useUser from "@/app/hooks/useUser";

const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const { user: initialUser, loading, error } = useUser();

//   const [user, setUser] = useState(initialUser);
//   console.log("from authContext", initialUser);

//   const updateUser = useCallback((updates) => {
//     setUser((prevUser) => ({ ...prevUser, ...updates }));
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, loading, error, updateUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const {
    user: initialUser,
    loading: initialLoading,
    error: initialError,
  } = useUser();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!initialLoading) {
      setUser(initialUser);
      setLoading(false);
      setError(initialError);
    }
  }, [initialUser, initialLoading, initialError]);

  const updateUser = useCallback((updates) => {
    setUser((prevUser) => {
      if (!prevUser) return updates;
      return { ...prevUser, ...updates };
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

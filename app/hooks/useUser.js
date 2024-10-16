import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs"; // assuming you're using Clerk for authentication

const useUser = () => {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!isLoaded || !userId) {
        setLoading(false);
        return;
      }

      try {
        const token = await getToken();
        const response = await fetch("/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [isLoaded, userId, getToken]);

  return { user, loading, error };
};

export default useUser;

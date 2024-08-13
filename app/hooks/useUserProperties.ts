import { useState, useEffect, useCallback } from "react";

export function useUserProperties(userId: string) {
  const [properties, setProperties] = useState({
    stripeCustomerId: null,
    isSubscribed: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProperties = useCallback(() => {
    if (userId) {
      setLoading(true);
      setError(null);

      fetch(`/api/get-kinde-user-properties/${userId}`, {
        method: "GET",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Error fetching properties: ${res.statusText}`);
          }
          return res.json();
        })
        .then((data) => {
          setProperties({
            stripeCustomerId: data.stripeCustomerId,
            isSubscribed: data.isSubscribed,
          });
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [userId]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  return { properties, loading, error, refresh: fetchProperties };
}

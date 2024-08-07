"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Promotion from "@/lib/models/Promotion";

export const usePromotions = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPromotions = useCallback(async () => {
    try {
      console.log("Fetching promotions...");
      setLoading(true);
      const timestamp = new Date().getTime(); // Generate a unique timestamp
      const response = await fetch(`/api/promotions?timestamp=${timestamp}`, {
        method: "GET",
        cache: "no-store",
        next: {
          revalidate: 0,
        },
      });

      const data: Promotion[] = await response.json();
      console.log("Promotions fetched:", data);

      setPromotions(data);
    } catch (err: any) {
      setError(err);
      console.log("Error fetching promotions:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    promotions,
    fetchPromotions,
    isLoading,
    error,
  };
};

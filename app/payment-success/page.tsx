"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function PricingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const checkoutSessionId = searchParams.get("checkout_session_id");

  const { isAuthenticated, user, accessTokenRaw } = useKindeBrowserClient();

  useEffect(() => {
    if (checkoutSessionId && user && accessTokenRaw) {
      console.log("saving stripe customer id");
      // Fetch the session details from Stripe
      fetch(`/api/fetch-stripe-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId: checkoutSessionId }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data);
          const customerId = data.customerId; // Assume you get this from your API endpoint

          // Update Kinde user properties
          const userId = user?.id; // Replace with the actual user ID

          const headers = {
            Accept: "application/json",
            Authorization: `Bearer ${accessTokenRaw}`,
          };

          // Update stripe-customer-id
          fetch(
            `https://rush2wager.kinde.com/api/v1/users/${userId}/properties/stripe-customer-id?value=${customerId}`,
            {
              method: "PUT",
              headers: headers,
            }
          )
            .then((res) => res.json())
            .then((body) => {
              console.log("Updated stripe-customer-id:", body);

              // Update is-subscribed
              return fetch(
                `https://rush2wager.kinde.com/api/v1/users/${userId}/properties/is-subscribed?value=true`,
                {
                  method: "PUT",
                  headers: headers,
                }
              );
            })
            .then((res) => res.json())
            .then((body) => {
              console.log("Updated is-subscribed:", body);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        })
        .catch((error) => {
          console.error("Error fetching Stripe session:", error);
        });
    }
  }, [accessTokenRaw, checkoutSessionId, user]);

  return (
    <div>
      <h1>Pricing Page</h1>
      {checkoutSessionId && <p>Checkout Session ID: {checkoutSessionId}</p>}
    </div>
  );
}

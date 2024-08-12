"use client";

import { toast } from "@/components/ui/use-toast";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import React, { use, useEffect } from "react";

export default function PricingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const checkoutSessionId = searchParams.get("checkout_session_id");

  const { isAuthenticated, user } = useKindeBrowserClient();

  const [updateComplete, setUpdateComplete] = React.useState(false);
  const [loadingUserData, setLoadingUserData] = React.useState(false);

  useEffect(() => {
    if (checkoutSessionId && user) {
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

          // Update the user's stripe-customer-id and is-subscribed properties
          // Call the server-side API to update Kinde user properties
          fetch(`/api/update-kinde-user`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              customerId: customerId,
              userId: user?.id,
            }),
          })
            .then((res) => res.json())
            .then((body) => {
              //console.log("Updated Kinde user properties:", body);
              setUpdateComplete(true);
            })
            .catch((error) => {
              console.error("Error updating Kinde user properties:", error);
            });
        })
        .catch((error) => {
          console.error("Error fetching Stripe session:", error);
        });
    }
  }, [checkoutSessionId, user]);

  useEffect(() => {
    if (updateComplete) {
      toast({
        title: "Success",
        description: "Subscription updated successfully",
        variant: "default",
        duration: 5000,
      });
    }
  }, [updateComplete]);

  return (
    <div>
      <h1>Pricing Page</h1>
      {checkoutSessionId && <p>Checkout Session ID: {checkoutSessionId}</p>}
      {updateComplete && (
        <>
          <p>Subscription updated successfully</p>
        </>
      )}
    </div>
  );
}

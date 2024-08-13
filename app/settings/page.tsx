"use client";

import { Button } from "@/components/ui/button";
import { useUserProperties } from "../hooks/useUserProperties";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Label } from "@/components/ui/label";

export default function UserSettings() {
  const { user } = useKindeBrowserClient();
  const { properties, loading, error } = useUserProperties(user?.id || "");
  const manageSubscriptionLink = `https://billing.stripe.com/p/login/test_28ocPB748ajZaVa5kk`;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col gap-6 justify-center p-4">
      <h2>User Profile</h2>
      <Label>Stripe Customer ID: {properties.stripeCustomerId}</Label>
      <Label>Subscribed: {properties.isSubscribed ? "Yes" : "No"}</Label>
      <Button onClick={() => window.open(manageSubscriptionLink)}>
        <a href={manageSubscriptionLink}>Manage Subscription</a>
      </Button>
    </div>
  );
}

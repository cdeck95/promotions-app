"use server";

// app/api/get-kinde-user-properties/route.ts
import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { StripeSubscription } from "@/app/interfaces/StripeSubscription";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log("GET method called");

    const userID = params.id;
    console.log("userID", userID);

    if (!userID || userID === "") {
      return NextResponse.json(
        { message: "userID not provided" },
        { status: 400 }
      );
    }

    const client_id = process.env.KINDE_CLIENT_ID!;
    const client_secret = process.env.KINDE_CLIENT_SECRET!;

    const accessTokenResponse = await fetch(
      `https://rush2wager.kinde.com/oauth2/token`,
      {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          audience: "https://rush2wager.kinde.com/api",
          grant_type: "client_credentials",
          client_id: client_id,
          client_secret: client_secret,
        }),
      }
    );

    const accessTokenJSON = await accessTokenResponse.json();
    const accessToken = accessTokenJSON.access_token;

    console.log("accessToken: ", accessToken);

    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    const refreshClaimsResponse = await fetch(
      `https://rush2wager.kinde.com/api/v1/users/${userID}/refresh_claims`,
      {
        method: "POST",

        headers: headers,
      }
    );
    if (refreshClaimsResponse.status !== 200) {
      console.log("Error refreshing claims:", refreshClaimsResponse.statusText);
      throw new Error(
        `Error refreshing claims: ${refreshClaimsResponse.statusText}`
      );
    }
    console.log("refreshClaimsResponse", refreshClaimsResponse);

    const response = await fetch(
      `https://rush2wager.kinde.com/api/v1/users/${userID}/properties`,
      {
        method: "GET",
        headers: headers,
      }
    );
    if (response.status !== 200) {
      console.log("Error fetching properties:", response.statusText);
      throw new Error(`Error fetching properties: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("data", data);
    console.log("data.properties", data.properties);
    const stripeCustomerId = data.properties["stripe-customer-id"] || null;

    if (!stripeCustomerId) {
      console.log("No Stripe Customer ID found");
      return NextResponse.json(
        { message: "No Stripe Customer ID found" },
        { status: 404 }
      );
    }
    console.log("stripeCustomerId", stripeCustomerId);

    // Fetch subscriptions from Stripe
    const stripeResponse = await fetch(
      `https://api.stripe.com/v1/subscriptions?customer=${stripeCustomerId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`, // Ensure you have this environment variable set
          "Content-Type": "application/json",
        },
      }
    );
    console.log("stripeResponse", stripeResponse);

    if (!stripeResponse.ok) {
      throw new Error(
        `Error fetching subscriptions: ${stripeResponse.statusText}`
      );
    }

    const stripeData = await stripeResponse.json();
    console.log("stripeData", stripeData);
    const subscriptions: StripeSubscription[] = stripeData.data || [];
    console.log("subscriptions", subscriptions);

    const isSubscribed = subscriptions.some(
      (subscription: StripeSubscription) => subscription.status === "active"
    );

    return NextResponse.json({ stripeCustomerId, isSubscribed });
  } catch (error) {
    console.error("Error retrieving user properties:", error);
    return NextResponse.json(
      { message: "Error retrieving properties", error },
      { status: 500 }
    );
  }
}

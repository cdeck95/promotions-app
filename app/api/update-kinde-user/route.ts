"use server";

// app/api/update-kinde-user/route.js
import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST(req: Request) {
  const { customerId, userId } = await req.json();
  console.log("customerId", customerId);
  console.log("userId", userId);
  console.log("getting access token");
  const { getOrganization, isAuthenticated, getAccessToken } =
    getKindeServerSession();
  const userAccessToken = await getAccessToken();

  const organization = await getOrganization();
  const orgCode = organization?.orgCode;
  // console.log("organization: ", organization);
  // console.log("orgCode: ", orgCode);

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

  try {
    // Update stripe-customer-id
    const kindeResponse = await fetch(
      `https://rush2wager.kinde.com/api/v1/users/${userId}/properties/stripe-customer-id?value=${customerId}`,
      {
        method: "PUT",
        headers: headers,
      }
    );

    console.log("kindeResponse", kindeResponse);
    if (kindeResponse.status != 200) {
      throw new Error(
        `Failed to update stripe-customer-id: ${kindeResponse.status}`
      );
    }

    // Update is-subscribed
    const subscribedResponse = await fetch(
      `https://rush2wager.kinde.com/api/v1/users/${userId}/properties/subscription?value=true`,
      {
        method: "PUT",
        headers: headers,
      }
    );

    console.log("subscribedResponse", subscribedResponse);
    if (subscribedResponse.status != 200) {
      throw new Error(
        `Failed to update is-subscribed: ${subscribedResponse.status}`
      );
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

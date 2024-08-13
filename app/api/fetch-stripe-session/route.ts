// pages/api/fetch-stripe-session.js
import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
  console.log("request", request);
  try {
    const { sessionId } = await request.json();
    console.log("sessionId", sessionId);

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log("session", session);
    const customer = session.customer;
    console.log("customer", customer);
    return NextResponse.json({ customerId: customer });
  } catch (error) {
    console.error("Internal Error:", error);
    // Handle other errors (e.g., network issues, parsing errors)
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}

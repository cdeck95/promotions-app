// app/api/promotions/route.ts
import { NextResponse } from "next/server";
import Promotion from "../../../lib/models/Promotion";

export async function GET() {
  try {
    const promotions = await Promotion.findAll();
    promotions.forEach((promotion) => {
      if (promotion.leagueName === "") {
        promotion.leagueName = null;
      }
    });
    return NextResponse.json(promotions);
  } catch (error) {
    console.error("Error fetching promotions:", error);
    return NextResponse.json(
      { message: "Error fetching promotions", error },
      { status: 500 }
    );
  }
}

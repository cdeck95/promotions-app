import { NextResponse } from "next/server";
import Promotion from "../../../lib/models/Promotion";
import { Op } from "sequelize";
import moment from "moment";
import { NextApiRequest } from "next";
import { put } from "@vercel/blob";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    // 1. Calculate the date 72 hours ago from now using moment
    const date72HoursAgo = moment().subtract(72, "hours").toDate();

    //console.log("Date 72 hours ago:", date72HoursAgo);

    // 2. Modify the query to filter by postedDateTime
    const promotions = await Promotion.findAll({
      where: {
        postedDateTime: {
          [Op.gte]: date72HoursAgo,
        },
      },
    });

    //console.log("Retrieved promotions:", promotions);

    promotions.forEach((promotion) => {
      if (promotion.leagueName === "") {
        promotion.leagueName = null;
      }
      if (promotion.applicableState === "") {
        promotion.applicableState = null;
      }
    });

    // 3. Retrieve the last entered promotion
    const lastPromotion = await Promotion.findOne({
      order: [["createdAt", "DESC"]],
    });

    if (lastPromotion) {
      // console.log(
      //   "Last entered promotion postedDateTime:",
      //   lastPromotion.postedDateTime
      // );
    }

    const response = NextResponse.json(promotions);
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    response.headers.set("Surrogate-Control", "no-store");

    return response;
  } catch (error) {
    console.error("Error fetching promotions:", error);
    return NextResponse.json(
      { message: "Error fetching promotions", error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Creating promotion with data:", body);

    // Validate the promotion data
    if (!body.title || !body.platform) {
      return NextResponse.json(
        { message: "Title and platform are required" },
        { status: 400 }
      );
    }

    console.log("Title and platform are provided");

    // Create a new promotion
    const newPromotion = await Promotion.create({
      title: body.title,
      description: body.description || "",
      platform: body.platform,
      postedDateTime: body.postedDateTime || new Date(),
      leagueName: body.leagueName || null,
      code: body.code || null,
      url: body.url || null,
      expiryDate: body.expiryDate || null,
      image: body.image || null,
      featured: body.featured || false,
      applicableState: body.applicableState || null,
    });

    console.log("Promotion created:", newPromotion);

    return NextResponse.json(newPromotion, { status: 201 });
  } catch (error) {
    console.error("Error creating promotion:", error);
    return NextResponse.json(
      { message: "Error creating promotion", error },
      { status: 500 }
    );
  }
}

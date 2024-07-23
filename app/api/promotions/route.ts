import { NextResponse } from "next/server";
import Promotion from "../../../lib/models/Promotion";
import { Op } from "sequelize";
import moment from "moment";

export async function GET() {
  try {
    // 1. Calculate the date 72 hours ago from now using moment
    const date72HoursAgo = moment().subtract(72, "hours").toDate();

    console.log("Date 72 hours ago:", date72HoursAgo);

    // 2. Modify the query to filter by postedDateTime
    const promotions = await Promotion.findAll({
      where: {
        postedDateTime: {
          [Op.gte]: date72HoursAgo,
        },
      },
    });

    console.log("Retrieved promotions:", promotions);

    promotions.forEach((promotion) => {
      if (promotion.leagueName === "") {
        promotion.leagueName = null;
      }
    });

    // 3. Retrieve the last entered promotion
    const lastPromotion = await Promotion.findOne({
      order: [["createdAt", "DESC"]],
    });

    if (lastPromotion) {
      console.log(
        "Last entered promotion postedDateTime:",
        lastPromotion.postedDateTime
      );
    }

    const response = NextResponse.json(promotions);
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response;
  } catch (error) {
    console.error("Error fetching promotions:", error);
    return NextResponse.json(
      { message: "Error fetching promotions", error },
      { status: 500 }
    );
  }
}

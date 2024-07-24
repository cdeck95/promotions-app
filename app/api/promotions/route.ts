import { NextResponse } from "next/server";
import Promotion from "../../../lib/models/Promotion";
import { Op } from "sequelize";
import moment from "moment";
import { NextApiRequest } from "next";

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

    return response;
  } catch (error) {
    console.error("Error fetching promotions:", error);
    return NextResponse.json(
      { message: "Error fetching promotions", error },
      { status: 500 }
    );
  }
}

export async function POST(req: NextApiRequest) {
  try {
    const promotion = await Promotion.create(req.body);

    console.log("Created promotion:", promotion);

    return NextResponse.json(promotion, { status: 201 });
  } catch (error) {
    console.error("Error creating promotion:", error);
    return NextResponse.json(
      { message: "Error creating promotion", error },
      { status: 500 }
    );
  }
}

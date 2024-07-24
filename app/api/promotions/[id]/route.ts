import { NextResponse } from "next/server";
import Promotion from "@/lib/models/Promotion";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log("Patch method called");

    const id = params.id;
    console.log("id", id);

    if (!id) {
      return NextResponse.json({ message: "Id not provided" }, { status: 400 });
    }

    const body = await request.json();
    console.log("Body:", body);

    const promotion = await Promotion.findByPk(id);
    console.log("Promotion found:", promotion);

    if (!promotion) {
      return NextResponse.json(
        { message: "Promotion not found" },
        { status: 404 }
      );
    }

    await promotion.update(body);

    console.log("Updated promotion:", promotion);

    return NextResponse.json(promotion);
  } catch (error) {
    console.error("Error updating promotion:", error);
    return NextResponse.json(
      { message: "Error updating promotion", error },
      { status: 500 }
    );
  }
}

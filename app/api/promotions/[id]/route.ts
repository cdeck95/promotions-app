import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { del } from "@vercel/blob";

import Promotion from "@/lib/models/Promotion";
import { KindeUser } from "@/app/interfaces/KindeUser";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log("GET method called");

    const id = params.id;
    console.log("id", id);

    if (!id) {
      return NextResponse.json({ message: "Id not provided" }, { status: 400 });
    }

    const { getAccessToken } = getKindeServerSession();
    const accessToken = await getAccessToken();

    console.log("accessToken", accessToken);

    if (!accessToken) {
      return NextResponse.json(
        { message: "No access token found" },
        { status: 401 }
      );
    }

    const promotion = await Promotion.findByPk(id);

    console.log("Retrieved promotion:", promotion);

    return NextResponse.json(promotion);
  } catch (error) {
    console.error("Error retrieving promotion:", error);
    return NextResponse.json(
      { message: "Error retrieving promotion", error },
      { status: 500 }
    );
  }
}

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

    const { getAccessToken } = getKindeServerSession();
    const accessToken = await getAccessToken();

    if (
      !accessToken ||
      !accessToken.roles ||
      !accessToken.roles?.some((role) => role.key === "promos-admin")
    ) {
      return NextResponse.json(
        { message: "You do not have permission to edit promotions" },
        { status: 403 }
      );
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

    if (body.image === "" && promotion.image !== "") {
      // Delete the image from Vercel Blob Storage
      if (promotion.image) {
        try {
          await del(promotion.image);
          console.log(
            "Deleted image from Vercel Blob Storage:",
            promotion.image
          );
        } catch (blobError) {
          console.error(
            "Error deleting image from Vercel Blob Storage:",
            blobError
          );
          return NextResponse.json(
            {
              message: "Error deleting image from Vercel Blob Storage",
              error: blobError,
            },
            { status: 500 }
          );
        }
      }
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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log("DELETE method called");

    const id = params.id;
    console.log("id", id);

    if (!id) {
      return NextResponse.json({ message: "Id not provided" }, { status: 400 });
    }

    const { getAccessToken } = getKindeServerSession();
    const accessToken = await getAccessToken();

    console.log("accessToken", accessToken);

    if (
      !accessToken ||
      !accessToken.roles ||
      !accessToken.roles?.some((role) => role.key === "promos-admin")
    ) {
      return NextResponse.json(
        { message: "You do not have permission to delete promotions" },
        { status: 403 }
      );
    }

    console.log("permissions passed");

    const promotion = await Promotion.findByPk(id);
    console.log("Promotion found:", promotion);

    if (!promotion) {
      return NextResponse.json(
        { message: "Promotion not found" },
        { status: 404 }
      );
    }

    // Delete the image from Vercel Blob Storage
    if (promotion.image) {
      try {
        await del(promotion.image);
        console.log("Deleted image from Vercel Blob Storage:", promotion.image);
      } catch (blobError) {
        console.error(
          "Error deleting image from Vercel Blob Storage:",
          blobError
        );
        return NextResponse.json(
          {
            message: "Error deleting image from Vercel Blob Storage",
            error: blobError,
          },
          { status: 500 }
        );
      }
    }

    await promotion.destroy();

    console.log("Deleted promotion:", promotion);
    return NextResponse.json({ message: "Promotion deleted" });
  } catch (error) {
    console.error("Error updating promotion:", error);
    return NextResponse.json(
      { message: "Error updating promotion", error },
      { status: 500 }
    );
  }
}

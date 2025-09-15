import { db } from "@/src/db/drizzle";
import { emoji } from "@/src/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // fetch the emojis from DB.
    const result = await db.select().from(emoji);
    return NextResponse.json(
      { status: "ok", data: result },
      {
        headers: {
          "Cache-Control": "no-store, must-revalidate",
          "CDN-Cache-Control": "no-store",
          "Vercel-CDN-Cache-Control": "no-store",
        },
      }
    );
  } catch (err) {
    console.log("error = ", err);
    return Response.json({ status: "error", data: err });
  }
}

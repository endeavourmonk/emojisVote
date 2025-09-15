import { db } from "@/src/db/drizzle";
import { emoji } from "@/src/db/schema";

export const dynamic = "force-static";

export async function GET() {
  try {
    // fetch the emojis from DB.
    const result = await db.select().from(emoji);
    return Response.json({ status: "ok", data: result });
  } catch (err) {
    console.log("error = ", err);
    return Response.json({ status: "error", data: err });
  }
}

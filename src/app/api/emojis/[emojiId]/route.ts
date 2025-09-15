import { db } from "@/src/db/drizzle";
import { emoji } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function POST(
  _req: NextRequest,
  { params }: { params: { emojiId: string } }
) {
  const { emojiId } = await params;
  if (!emojiId)
    return Response.json({
      status: "failed",
      message: "Emoji Id is required",
    });

  try {
    // Get the existing vote for that emoji.
    const existingEmoji = await db
      .select()
      .from(emoji)
      .where(eq(emoji.id, Number(emojiId)));

    if (!existingEmoji)
      return Response.json({
        status: "failed",
        message: `Emoji doesn't found for the ID: ${emoji}`,
      });

    // Update the vote count for that emoji in DB.
    const currentVotes = existingEmoji[0].votes;

    const updated = await db
      .update(emoji)
      .set({
        votes: currentVotes + 1,
      })
      .where(eq(emoji.id, Number(emojiId)))
      .returning();

    return Response.json({ updatedEmoji: updated });
  } catch (err) {
    console.log("error = ", err);
    return Response.json({ status: "error", data: err });
  }
}

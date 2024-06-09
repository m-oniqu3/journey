import { supabase } from "@/lib/supabaseClient";
import { HttpStatusCode } from "@/types";
import { Request, Response } from "express";

export async function getCommentsCount(req: Request, res: Response) {
  try {
    const { postID } = req.params as { postID: string };

    const { error, count } = await supabase
      .from("comments")
      .select("*", { count: "exact", head: true })
      .eq("post_id", +postID);

    if (error) throw error;

    return res.status(HttpStatusCode.OK).json({ data: count || 0 });
  } catch (error) {
    console.error("Error getting count for comment:", error);

    if (error.code) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ error: error.message });
    }

    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error. Could not get count for comment",
    });
  }
}

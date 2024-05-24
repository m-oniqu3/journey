import { supabase } from "@/lib/supabaseClient";
import { HttpStatusCode } from "@/types";
import { Request, Response } from "express";

export async function createComment(req: Request, res: Response) {
  const { content, postID, userID } = req.body as {
    content: string;
    postID: string;
    userID: string;
  };

  try {
    const { error } = await supabase.from("comments").insert([
      {
        comment: content,
        post_id: +postID,
        user_id: userID,
      },
    ]);

    if (error) throw error;

    return res.status(HttpStatusCode.CREATED).json({ data: "Comment created" });
  } catch (error) {
    console.error("Error creating comment:", error);

    if (error.code) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ error: error.message });
    }

    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error. Could not create comment",
    });
  }
}

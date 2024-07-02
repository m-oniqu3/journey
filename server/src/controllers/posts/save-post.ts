import { HttpStatusCode } from "@/types";
import { User } from "@supabase/supabase-js";
import { Request, Response } from "express";

export async function savePost(req: Request, res: Response) {
  try {
    const user = req.user as User;
    const { postID } = req.body as { postID: number };

    if (!postID) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ error: "Post ID is required to save this post" });
    }

    console.log("Saving post", postID, user.id);

    return res.status(HttpStatusCode.CREATED).json({ data: "Post saved" });
  } catch (error) {
    console.error("Error saving post", error);

    if (error.code) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ error: error.message });
    }

    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error. Could not save post" });
  }
}

import { supabase } from "@/lib/supabaseClient";
import { HttpStatusCode } from "@/types";
import { User } from "@supabase/supabase-js";
import { Request, Response } from "express";

export async function addRecentPost(req: Request, res: Response) {
  try {
    const user = req.user as User;

    const { postID } = req.body as { postID: number };

    if (!postID) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        error: "Post ID is required to save this post to recent posts.",
      });
    }

    console.log("Adding post to recent posts", postID, user.id);

    const { error } = await supabase
      .from("recent-posts")
      .insert([{ user_id: user.id, post_id: +postID }])
      .select();

    if (error) throw error;

    return res
      .status(HttpStatusCode.CREATED)
      .json({ data: "Post added to recent posts" });
  } catch (error) {
    console.error("Error adding post to recent posts", error);

    if (error.code) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ error: error.message });
    }

    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error. Could not add post to recent posts",
    });
  }
}

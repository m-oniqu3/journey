import { supabase } from "@/lib/supabaseClient";
import { HttpStatusCode } from "@/types";
import { User } from "@supabase/supabase-js";
import { Request, Response } from "express";

export async function getRecentPosts(req: Request, res: Response) {
  try {
    const user = req.user as User;

    let { data: posts, error: postsError } = await supabase
      .from("recent-posts")
      .select("post_id")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    //.range(0, 9);

    if (postsError) throw postsError;

    if (!posts) return res.status(HttpStatusCode.OK).json({ data: [] });

    const postIDs = posts.map((post) => post.post_id);

    // get the post details for each post
    // from posts - id, title, likes, space_id
    // from spaces -id, name, avatar

    // use promise.all instead of in filter to maintain order

    const promises = postIDs.map(async (postID) => {
      const { data, error } = await supabase
        .from("posts")
        .select(
          `
        id, title, creator, likes,
        spaces(id, name, avatar) `
        )
        .eq("id", postID)
        .single();

      if (error) throw error;

      return {
        id: data.id,
        title: data.title,
        likes: data.likes,
        space: data.spaces,
      };
    });

    const recentPosts = await Promise.all(promises);

    return res.status(HttpStatusCode.OK).json({ data: recentPosts });
  } catch (error) {
    console.error("Error getting recent posts", error);

    if (error.code) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ error: error.message });
    }

    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error. Could not get recent posts",
    });
  }
}

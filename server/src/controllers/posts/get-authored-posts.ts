import { supabase } from "@/lib/supabaseClient";
import { HttpStatusCode } from "@/types";
import { User } from "@supabase/supabase-js";
import { Request, Response } from "express";

export async function getAuthoredPosts(req: Request, res: Response) {
  try {
    const range = String(req.query.range).split(",").map(Number);
    const user = req.user as User;

    // promise for getting posts
    const authoredPosts = supabase
      .from("posts")
      .select(
        `
        id, title, body, created_at, creator, likes,
        images(id, url), 
        tags(name, id, colour),
        spaces(id, name, avatar) `
      )
      .eq("creator", user.id)
      .order("created_at", { ascending: false })
      .range(range[0], range[1]);

    // promise for getting profile details
    const profileDetails = supabase
      .from("profiles")
      .select("user_id, username, display_name, avatar")
      .eq("user_id", user.id);

    // promise.all to get posts and profile details
    const [posts, profile] = await Promise.all([authoredPosts, profileDetails]);

    if (posts.error) throw posts.error;

    if (profile.error) throw profile.error;

    if (!posts.data) {
      return res.status(HttpStatusCode.OK).json({ data: [] });
    }

    // array of posts with profile details
    const postsAndProfile = posts.data.map((post) => {
      return {
        id: post.id,
        title: post.title,
        body: post.body,
        created_at: post.created_at,
        likes: post.likes,
        images: post.images,
        tag: post.tags,
        creator: profile.data,
        space: post.spaces,
      };
    });

    return res.status(HttpStatusCode.OK).json({ data: postsAndProfile });
  } catch (error) {
    console.error("Error getting authored posts:", error);

    if (error.code) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ error: error.message });
    }

    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error. Could not get authored posts",
    });
  }
}

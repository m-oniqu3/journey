import { supabase } from "@/lib/supabaseClient";
import { HttpStatusCode, ProfileRecord, ProfileSummaryForPost } from "@/types";
import { Request, Response } from "express";

export async function getPosts(req: Request, res: Response) {
  const range = String(req.query.range).split(",").map(Number);

  try {
    const { data, error } = await supabase
      .from("posts")
      .select(
        `
        id, title, body, created_at, creator, 
        images(id, url), 
        tags(name, id, colour),
        spaces(id, name, avatar) `
      )
      .order("created_at", { ascending: false })
      .range(range[0], range[1]);

    console.log(req.query.range);

    if (error) throw error;

    if (!data) {
      return res.status(HttpStatusCode.OK).json({ data: [] });
    }

    // get creator IDs
    const creatorIDs = data.map((post) => post.creator) as string[];

    // get profile details for each post
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("user_id, username, display_name, avatar")
      .in("user_id", creatorIDs);

    if (profileError) throw profileError;

    const profiles = profileData as ProfileSummaryForPost[];

    const profileMap = profiles.reduce((acc, cur) => {
      acc[cur.user_id] = cur;
      return acc;
    }, {} as ProfileRecord);

    // add profile details to each post and change tags to tag
    const postsAndProfiles = data.map((post) => {
      return {
        id: post.id,
        title: post.title,
        body: post.body,
        created_at: post.created_at,
        images: post.images,
        tag: post.tags,
        creator: profileMap[post.creator as string],
        space: post.spaces,
      };
    });

    return res.status(HttpStatusCode.OK).json({ data: postsAndProfiles });
  } catch (error) {
    console.error("Error getting all posts :", error);

    if (error.code) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ error: error.message });
    }

    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error. Could not get user spaces",
    });
  }
}

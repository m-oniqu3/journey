import { supabase } from "@/lib/supabaseClient";
import { HttpStatusCode } from "@/types";
import { User } from "@supabase/supabase-js";
import { Request, Response } from "express";

export async function getPostsForJoinedSpaces(req: Request, res: Response) {
  try {
    const range = String(req.query.range).split(",").map(Number);
    const user = req.user as User;

    // get spaces that the user joined
    const { data: spaceData, error: spaceError } = await supabase
      .from("user-spaces")
      .select(
        `space_id,
        spaces(id, name, avatar)`
      )
      .eq("user_id", user.id);

    if (spaceError) throw spaceError;

    const spaceIDs = spaceData.map((space) => space.space_id);

    // get posts for spaces that the user joined
    const { data, error } = await supabase
      .from("posts")
      .select(
        `
        id, title, body, created_at, creator, space_id, likes,
        images(id, url),
        tags(name, id, colour)
       `
      )
      .in("space_id", spaceIDs)
      .order("created_at", { ascending: false })
      .range(range[0], range[1]);
    // .gt("likes", 3500);

    if (error) throw error;

    if (!data) {
      return res.status(HttpStatusCode.OK).json({ data: [] });
    }

    // hashmap of space id to space details
    const spaceMap = spaceData.reduce((acc, cur) => {
      if (!cur.spaces) return acc;
      acc[cur.space_id] = cur.spaces;
      return acc;
    }, {} as Record<string, { id: number; name: string; avatar: string | null }>);

    //get profile details for each post
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("user_id, username, display_name, avatar")
      .in(
        "user_id",
        data.map((post) => post.creator as string)
      );

    if (profileError) throw profileError;

    // hashmap of user id to profile details
    const profileMap = profileData.reduce((acc, cur) => {
      acc[cur.user_id] = cur;
      return acc;
    }, {} as Record<string, { user_id: string; username: string; display_name: string | null; avatar: string | null }>);

    // include space details for each post
    const postsAndSpaces = data.map((post) => {
      return {
        id: post.id,
        title: post.title,
        body: post.body,
        created_at: post.created_at,
        likes: post.likes,
        images: post.images,
        tag: post.tags,
        space: spaceMap[post.space_id],
        creator: profileMap[post.creator as string],
      };
    });

    return res.status(HttpStatusCode.OK).json({ data: postsAndSpaces });
  } catch (error) {
    console.error("Error getting posts for space:", error);

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

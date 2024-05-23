import { supabase } from "@/lib/supabaseClient";
import { HttpStatusCode, ProfileRecord, ProfileSummaryForPost } from "@/types";
import { Request, Response } from "express";

/**
 *
 * @param req Request
 * @param res Response
 * @description Get all posts for a space. Includes post details, creator profile details, images and tags
 */
export async function getSpacePosts(req: Request, res: Response) {
  const space = req.locals.space;
  const range = String(req.query.range).split(",").map(Number);

  /**
   *  join posts, images, tags
   * tags - name, id, colour
   * posts - id, title, body, created_at, creator, space_id, tag_id
   * images - id, post_id, url , user_id
   */

  try {
    const { data: postData, error: postError } = await supabase
      .from("posts")
      .select(
        `
        id, title, body, created_at, creator, likes,
        images(id, url), 
        tags(name, id, colour)
        `
      )
      .eq("space_id", space.id)
      .order("created_at", { ascending: false })
      .range(range[0], range[1]);

    if (postError) throw postError;

    if (!postData) {
      return res.status(HttpStatusCode.OK).json({ data: [] });
    }

    // get creator IDs
    const creatorIDs = postData.map((post) => post.creator) as string[];

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
    const postsAndProfiles = postData.map((post) => {
      return {
        id: post.id,
        title: post.title,
        body: post.body,
        created_at: post.created_at,
        likes: post.likes,
        images: post.images,
        tag: post.tags,
        creator: profileMap[post.creator as string],
        space: { id: space.id, name: space.name, avatar: space.avatar },
      };
    });

    return res.status(HttpStatusCode.OK).json({ data: postsAndProfiles });
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

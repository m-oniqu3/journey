import { supabase } from "@/lib/supabaseClient";
import { HttpStatusCode, ProfileSummaryForPost } from "@/types";
import { Request, Response } from "express";

/**
 *
 * @param req Request
 * @param res Response
 * @description Get post by id - get post details, creator details, tags, images and space details for a post
 * @returns { data: PostSummary }
 */
export async function getPostById(req: Request, res: Response) {
  try {
    const id: string = req.params.id;

    //   get post details and join with tags, images and spaces
    const { data, error } = await supabase
      .from("posts")
      .select(
        `
        id, title, body, created_at, creator, 
        images(id, url), 
        tags(name, id, colour),
        spaces(id, name, avatar) `
      )
      .eq("id", +id)
      .single();

    if (error) throw error;

    if (!data) throw new Error("Post not found");

    // get profile details for  post
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("user_id, username, display_name, avatar")
      .eq("user_id", data.creator as string)
      .single();

    if (profileError) throw profileError;

    // add profile details to each post and change tags to tag
    const result = {
      id: data.id,
      title: data.title,
      body: data.body,
      created_at: data.created_at,
      images: data.images,
      tag: data.tags,
      creator: profileData as ProfileSummaryForPost,
      space: data.spaces,
    };

    return res.status(HttpStatusCode.OK).json({ data: result });
  } catch (error) {
    console.error("Error creating space:", error);

    if (error.code) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ error: error.message });
    }

    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error. Could not create space",
    });
  }
}

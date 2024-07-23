import { supabase } from "@/lib/supabaseClient";
import { HttpStatusCode, UniquePosts, UniqueReplies } from "@/types";
import { User } from "@supabase/supabase-js";
import { Request, Response } from "express";

export async function getAuthoredComments(req: Request, res: Response) {
  try {
    const range = String(req.query.range).split(",").map(Number);
    const user = req.user as User;

    // get comments created by user
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("user_id", user.id)
      .range(range[0], range[1])
      .order("created_at", { ascending: false });

    if (error) throw error;

    const allIDs = data.map((comment) => {
      return {
        post_id: comment.post_id,
        replyIDs: {
          commentID: comment.id,
          replyToComment: comment.reply_id,
        },
      };
    });

    // for each comment, get the post it belongs to
    //const postIDs = data.map((comment) => comment.post_id);

    // for each post, get the space it belongs to
    const postPromise = allIDs.map(async (entry) => {
      const { data, error } = await supabase
        .from("posts")
        .select(
          `id, title,
           spaces(id, name, avatar)
           `
        )
        .eq("id", entry.post_id)
        .single();

      if (error) throw error;

      return data;
    });

    // for each comment, if it is a reply, get the comment it is replying to and the user who wrote that original comment
    // const replyIDs = data.map((comment) => {
    //   return {
    //     commentID: comment.id,
    //     replyToComment: comment.reply_id,
    //   };
    // });

    //   if a comment is a reply, get the user details of the original comment
    // if it has a reply_id, it is a reply to a comment
    const replyPromise = allIDs.map(async (entry) => {
      if (entry.replyIDs.replyToComment) {
        // get the comment details for the comment being replied to
        const { data, error } = await supabase
          .from("comments")
          .select("id, user_id, comment, post_id")
          .eq("id", entry.replyIDs.replyToComment)
          .single();

        if (error) throw error;

        // get the profile details for the user who wrote the original comment

        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("username, display_name, user_id")
          .eq("user_id", data.user_id)
          .single();

        if (profileError) throw profileError;

        return {
          id: data.id,
          commentBeingRepliedTo: data.comment,
          post_id: data.post_id,
          user: profileData,
        };
      }

      return null;
    });

    // get profile details for author
    const userProfile = await supabase
      .from("profiles")
      .select("username, display_name, user_id")
      .eq("user_id", user.id)
      .single();

    if (userProfile.error) throw userProfile.error;

    // Promise.all for both promises
    const [posts, replies] = await Promise.all([
      Promise.all(postPromise),
      Promise.all(replyPromise),
    ]);

    //post hashmap - the key is the post id
    const postsMap = posts.reduce((acc, post) => {
      if (!post) return acc;
      if (!acc[post.id]) {
        acc[post.id] = post;
      }

      return acc;
    }, {} as UniquePosts);

    // hashmap of commentID to reply details
    const repliesMap = replies.reduce((acc, curr) => {
      if (!curr) return acc;
      acc[curr.id] = curr;
      return acc;
    }, {} as UniqueReplies);

    // add repliedToUser to each comment & add OP profile details
    const commentsAndPosts = data.map((comment) => {
      const repliedTo = comment.reply_id ? repliesMap[comment.reply_id] : null;

      return {
        id: comment.id,
        body: comment.comment,
        created_at: comment.created_at,
        post: postsMap[comment.post_id] || null,
        repliedTo,
      };
    });

    return res.status(HttpStatusCode.OK).json({
      data: {
        user: userProfile.data,
        comments: commentsAndPosts,
      },
    });
  } catch (error) {
    console.error("Error getting authored comments:", error);

    if (error.code) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ error: error.message });
    }

    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error. Could not get authored comments",
    });
  }
}

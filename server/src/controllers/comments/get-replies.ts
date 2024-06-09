import { supabase } from "@/lib/supabaseClient";
import { HttpStatusCode, ProfileSummaryForPost } from "@/types";
import { Request, Response } from "express";

export async function GetRepliesForComment(req: Request, res: Response) {
  // to get reply you need - commentID and postID and range
  const { commentID } = req.params as { commentID: string };
  const range = String(req.query.range).split(",").map(Number);
  const postID = req.query.postID as string;

  try {
    // comment needs id, post_id, comment, created_at, updated_at and creator details
    // get replies for a comment
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("reply_id", +commentID)
      .eq("post_id", +postID)
      .range(range[0], range[1]);

    if (error) throw error;

    const commentIDs = data.map((comment) => comment.id);
    const userIDs = data.map((comment) => comment.user_id);

    // get profiles for users who made the comments
    const profilesPromise = userIDs.map(async (id) => {
      const { data, error } = await supabase
        .from("profiles")
        .select("username, avatar, display_name, user_id")
        .eq("user_id", id)
        .single();

      if (error) throw error;

      return data;
    });

    // get replies for each reply
    const commentsPromise = commentIDs.map(async (commentID) => {
      const { data, error } = await supabase
        .from("comments")
        .select("id")
        .eq("reply_id", commentID);

      if (error) throw error;

      return {
        commentID,
        repliesCount: data.length,
      };
    });

    // Promise.all for both promises
    const [profiles, comments] = await Promise.all([
      Promise.all(profilesPromise),
      Promise.all(commentsPromise),
    ]);

    const userProfiles = profiles as ProfileSummaryForPost[];

    // resolve profiles
    const profilesMap = userProfiles.reduce(
      (acc, curr) => {
        if (curr.user_id) {
          acc[curr.user_id] = curr;
        }
        return acc;
      },
      {} as Record<
        string,
        {
          username: string;
          avatar: string;
          display_name: string;
          user_id: string;
        }
      >
    );

    // hashmap of commentID to repliesCount
    const countsMap = comments.reduce((acc, curr) => {
      acc[curr.commentID] = curr.repliesCount;
      return acc;
    }, {} as Record<number, number>);

    // add repliesCount to each comment
    const commentsAndReplies = data.map((comment) => {
      return {
        ...comment,
        repliesCount: countsMap[comment.id] || 0,
        creator: profilesMap[comment.user_id],
      };
    });

    return res.status(HttpStatusCode.OK).json({ data: commentsAndReplies });
  } catch (error) {
    console.error("Error getting replies for comment:", error);

    if (error.code) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ error: error.message });
    }

    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error. Could not get replies for comment",
    });
  }
}

import { supabase } from "@/lib/supabaseClient";
import { HttpStatusCode, ProfileSummaryForPost } from "@/types";
import { Request, Response } from "express";

export async function getComments(req: Request, res: Response) {
  const { postID } = req.params as { postID: string };
  const range = String([0, 10]).split(",").map(Number);

  try {
    //   get comments that aren't replies to other comments
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", +postID)
      .is("reply_id", null)
      .range(range[0], range[1]);

    if (error) throw error;

    const commentIDs = data.map((comment) => comment.id);
    const userIDs = data.map((comment) => comment.user_id);

    const profilesPromise = userIDs.map(async (id) => {
      const { data, error } = await supabase
        .from("profiles")
        .select("username, avatar, display_name, user_id")
        .eq("user_id", id)
        .single();

      if (error) throw error;

      return data;
    });

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

    //prmise all
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
        profile: profilesMap[comment.user_id],
      };
    });

    return res.status(HttpStatusCode.OK).json({ data: commentsAndReplies });
  } catch (error) {
    console.error("Error getting comments:", error);

    if (error.code) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ error: error.message });
    }

    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error. Could not get comments",
    });
  }
}

/**
 *  // for each comment, get the number of replies
    const counts = await Promise.all(
      commentIDs.map(async (commentID) => {
        const { data, error } = await supabase
          .from("comments")
          .select("id")
          .eq("reply_id", commentID);

          if (error) throw error;
          
          

        return {
          commentID,
          repliesCount: data.length,
        };
      })
    );

 */

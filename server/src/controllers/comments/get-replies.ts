import { HttpStatusCode } from "@/types";
import { Request, Response } from "express";

export async function GetRepliesForComment(req: Request, res: Response) {
  // to get reply you need - commentID and postID and range
  const { commentID } = req.params as { commentID: string };
  const range = String(req.query.range).split(",").map(Number);
  const postID = req.query.postID as string;

  try {
    console.log(commentID, postID, range);

    return res.status(200).json({ data: "Get replies for comment" });
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

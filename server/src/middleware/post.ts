import { supabase } from "@/lib/supabaseClient";
import { HttpStatusCode } from "@/types";
import { NextFunction, Request, Response } from "express";

export async function checkIfPostExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log("Checking if post exists", req.body);
    const { postID } = req.body as { postID: number };

    if (!postID) {
      return res.status(400).json({ message: "Post ID is required" });
    }

    const { data, error } = await supabase
      .from("posts")
      .select("id")
      .eq("id", +postID)
      .single();

    if (error) throw error;

    if (!data) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ message: "Post not found" });
    }

    return next();
  } catch (error) {
    console.error("Error checking post existence:", error);

    if (error.code) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ error: error.message });
    }

    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error. Could not check post existence",
    });
  }
}

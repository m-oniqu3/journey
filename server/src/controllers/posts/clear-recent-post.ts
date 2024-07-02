import { supabase } from "@/lib/supabaseClient";
import { HttpStatusCode } from "@/types";
import { User } from "@supabase/supabase-js";
import { Request, Response } from "express";

export async function clearRecentPost(req: Request, res: Response) {
  try {
    const user = req.user as User;

    const { error } = await supabase
      .from("recent-posts")
      .delete()
      .eq("user_id", user.id);

    if (error) throw error;

    return res.status(HttpStatusCode.OK).json({ data: "Recent posts cleared" });
  } catch (error) {
    console.error("Error in clearing recent posts", error);

    if (error.code) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ error: error.message });
    }

    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error. Could not clear recent posts",
    });
  }
}

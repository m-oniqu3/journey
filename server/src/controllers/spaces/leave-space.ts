import { supabase } from "@/lib/supabaseClient";
import { HttpStatusCode } from "@/types";
import { User } from "@supabase/supabase-js";
import { Request, Response } from "express";

export async function leaveSpace(req: Request, res: Response) {
  const space = req.locals.space;
  const userID = (req.user as User).id;

  console.log("Leaving space", space, userID);

  try {
    // leave the user from the space
    const { error } = await supabase
      .from("user-spaces")
      .delete()
      .eq("user_id", userID)
      .eq("space_id", space.id);

    if (error) throw error;

    return res.status(HttpStatusCode.OK).json({ data: "Left space" });
  } catch (error) {
    console.error("Error leaving space:", error);

    if (error.code) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ error: error.message });
    }

    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error. Could not leave space",
    });
  }
}

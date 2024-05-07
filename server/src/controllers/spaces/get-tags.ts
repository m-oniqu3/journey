import { supabase } from "@/lib/supabaseClient";
import { HttpStatusCode } from "@/types";
import { Request, Response } from "express";

export async function getTagsForSpace(req: Request, res: Response) {
  const space = req.locals.space;

  try {
    const { data, error } = await supabase
      .from("tags")
      .select("id ,name, colour")
      .eq("space_id", space.id);

    if (error) throw error;

    if (!data) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ error: "No tags found" });
    }

    return res.status(HttpStatusCode.OK).json({ data });
  } catch (error) {
    console.error("Error getting tags for space:", error);

    if (error.code) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ error: error.message });
    }

    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error. Could not get tags for space",
    });
  }
}

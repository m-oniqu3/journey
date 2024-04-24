import { supabase } from "@/lib/supabaseClient";
import { HttpStatusCode } from "@/types";
import { Request, Response } from "express";

export async function createSpace(req: Request, res: Response) {
  try {
    const { name, type, userID } = req.body as {
      name: string;
      type: string;
      userID: string;
    };

    const { error } = await supabase
      .from("spaces")
      .insert([{ name, privacy_type: type, creator: userID, members_count: 1 }])
      .select();

    if (error) throw error;

    return res
      .status(HttpStatusCode.CREATED)
      .json({ data: "Space created successfully" });
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

export async function getSpaceDetails(req: Request, res: Response) {
  const space = req.locals.space;

  return res.status(HttpStatusCode.OK).json({ data: space });
}

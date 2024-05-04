import { supabase } from "@/lib/supabaseClient";
import { HttpStatusCode } from "@/types";
import { User } from "@supabase/supabase-js";
import { Request, Response } from "express";

export async function joinSpace(req: Request, res: Response) {
  const space = req.locals.space;
  const userID = (req.user as User).id;

  console.log("Joining space", space, userID);

  try {
    // join the user to the space and get the space details from the spaces table
    const { data, error } = await supabase
      .from("user-spaces")
      .insert([{ user_id: userID, space_id: space.id }])
      .select("spaces(id, name, avatar, creator)")
      .single();

    if (error) throw error;

    if (!data || !data.spaces) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ error: "Could not join space" });
    }

    const joinedSpace = {
      id: data.spaces.id,
      name: data.spaces.name,
      avatar: data.spaces.avatar || "",
      isCreator: data.spaces.creator === userID,
    };

    return res.status(HttpStatusCode.CREATED).json({ data: joinedSpace });
  } catch (error) {
    console.error("Error joining space:", error);

    if (error.code) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ error: error.message });
    }

    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error. Could not join space",
    });
  }
}

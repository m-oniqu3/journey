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

    const { data, error } = await supabase
      .from("spaces")
      .insert([{ name, privacy_type: type, creator: userID, members_count: 1 }])
      .select("id")
      .single();

    if (error) throw error;

    // join the user to the space

    const result = await supabase
      .from("user-spaces")
      .insert([{ user_id: userID, space_id: data.id }])
      .select();

    if (result.error) throw result.error;

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

export async function getUsersSpaces(req: Request, res: Response) {
  const userID = req.params.userID;

  try {
    // get user spaces by joining the user-spaces table with the spaces table
    const { data, error } = await supabase
      .from("user-spaces")
      .select("spaces(id, name, avatar,creator)")
      .eq("user_id", userID);

    if (error) throw error;

    if (!data) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ error: "No spaces found" });
    }

    // transform the array into an object with space names as keys
    const spaceDetails = data.reduce((acc, cur) => {
      if (!cur.spaces) return acc;
      const name = cur.spaces.name;

      acc[name as string] = {
        id: cur.spaces.id,
        name: cur.spaces.name,
        avatar: cur.spaces.avatar || "",
        isCreator: cur.spaces.creator === userID,
      };

      return acc;
    }, {} as Record<string, { id: number; name: string; avatar: string; isCreator: boolean }>);

    return res.status(HttpStatusCode.OK).json({ data: spaceDetails });
  } catch (error) {
    console.error("Error getting user spaces:", error);

    if (error.code) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ error: error.message });
    }

    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error. Could not get user spaces",
    });
  }
}

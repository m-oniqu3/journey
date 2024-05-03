import { supabase } from "@/lib/supabaseClient";
import { HttpStatusCode } from "@/types";
import { User } from "@supabase/supabase-js";
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
      .select("id, name, avatar")
      .single();

    if (error) throw error;

    if (!data) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ error: "Could not create space" });
    }

    // join the user to the space
    const result = await supabase
      .from("user-spaces")
      .insert([{ user_id: userID, space_id: data.id }])
      .select();

    if (result.error) throw result.error;

    if (!data) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ error: "Could not create space" });
    }

    const space = {
      id: data.id,
      name,
      avatar: data.avatar || "",
      isCreator: true,
    };

    return res.status(HttpStatusCode.CREATED).json({ data: space });
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
  const user = req.user as User;

  if (userID !== user.id) {
    return res
      .status(HttpStatusCode.UNAUTHORIZED)
      .json({ error: "Unauthorized" });
  }

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

export async function joinSpace(req: Request, res: Response) {
  const space = req.locals.space;
  const userID = (req.user as User).id;

  console.log("Joining space", space, userID);

  try {
    // join the user to the space
    const { data, error } = await supabase
      .from("user-spaces")
      .insert([{ user_id: userID, space_id: space.id }])
      .select("space_id");

    if (error) throw error;

    if (!data) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ error: "Could not join space" });
    }

    // increment the members count in the spaces table
    const { data: updateSpaceData, error: updateSpaceError } = await supabase
      .from("spaces")
      .update({ members_count: space.members_count + 1 })
      .eq("id", space.id)
      .select()
      .single();

    if (updateSpaceError) {
      // rollback the user-space entry
      await supabase
        .from("user-spaces")
        .delete()
        .eq("user_id", userID)
        .eq("space_id", space.id);

      throw updateSpaceError;
    }

    const joinedSpace = {
      id: updateSpaceData.id,
      name: updateSpaceData.name,
      avatar: updateSpaceData.avatar || "",
      isCreator: updateSpaceData.creator === userID,
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

export async function getAllSpaces(_req: Request, res: Response) {
  try {
    const { data, error } = await supabase
      .from("spaces")
      .select()
      .order("members_count", { ascending: false });

    if (error) throw error;

    return res.status(HttpStatusCode.OK).json({ data });
  } catch (error) {
    console.error("Error getting all spaces:", error);

    if (error.code) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ error: error.message });
    }

    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error. Could not get spaces",
    });
  }
}

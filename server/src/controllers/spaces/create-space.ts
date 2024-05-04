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
      .insert([{ name, privacy_type: type, creator: userID }])
      .select("id, name, avatar")
      .single();

    if (error) throw error;

    if (!data) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ error: "Could not create space" });
    }

    const space = { id: data.id, name, avatar: data.avatar, isCreator: true };

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

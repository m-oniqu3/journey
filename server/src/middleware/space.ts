import { supabase } from "@/lib/supabaseClient";
import { HttpStatusCode } from "@/types";
import { NextFunction, Request, Response } from "express";

export async function checkSpaceExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const name = req.params.name as string;
    // Get space details

    const { data, error } = await supabase
      .from("spaces")
      .select("*")
      .eq("name", name)
      .single();

    // If the space does not exist, send a 404 Not Found response
    if (!data) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ error: "Space not found" });
    }

    if (error) throw error;

    req.locals.space = data;

    console.log("Space details:", data);

    return next();
  } catch (error) {
    console.error("Error checking space existence:", error);
    if (error.code) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ error: error.message });
    }

    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error. Could not get space details",
    });
  }
}

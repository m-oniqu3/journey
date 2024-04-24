import { supabase } from "@/lib/supabaseClient";
import { AuthError } from "@supabase/supabase-js";
import { type NextFunction, type Request, type Response } from "express";

export async function loadUserFromToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.user = null;

  const authHeader = req.headers.authorization;

  if (!authHeader) return next();

  const brokenHeader = authHeader.split(" ");
  if (brokenHeader.length !== 2) return next();
  const token = brokenHeader[1];

  try {
    //verify token with supabase
    const { data, error } = await supabase.auth.getUser(token);

    if (error) throw error;

    if (data) {
      req.user = data.user;
    }

    next();
  } catch (error) {
    if (error instanceof AuthError) {
      console.log("middleware", error.name, error.message, error.status);

      if (error.message.includes("token is expired ")) {
        console.log("Token expired");

        return res.status(401).json({ error: "Token expired" });
      }
    }

    console.log(
      "Error in loadUserFromToken middleware. Could not load user from token"
    );
  }
}

//middleware to check if user is authenticated
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  console.log("requireAuth");

  if (!req.user) {
    console.log("Unauthorized, no user found");

    res.status(401).json({ error: "Unauthorized" });
    return;
  } else {
    next();
  }
}

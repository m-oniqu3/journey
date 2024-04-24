import { supabase } from "@/lib/supabaseClient";
import { AuthError } from "@supabase/supabase-js";
import { Request, Response } from "express";

export async function login(req: Request, res: Response) {
  console.log(req.body);

  try {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    if (!email || !password) {
      throw new Error("Invalid request body");
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    //send required user data and token
    const { user, session } = data;

    const userData = { id: user.id, email: user.email };

    const token = session.access_token;
    const expiry = session.expires_at;

    // set the refresh token as a cookie
    res.cookie("jrt", session.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      data: { user: userData, token: { access_token: token, expiry } },
    });
  } catch (error: unknown) {
    if (error instanceof AuthError) {
      return res.status(401).json({ error: error.message });
    }

    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function register(req: Request, res: Response) {
  const redirectUrl = new URL(
    process.env.REDIRECT_URL ?? "http://localhost:5173/verification"
  );

  try {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    if (!email || !password) {
      throw new Error("Invalid request body");
    }

    const { data, error: signupError } = await supabase.auth.signUp({
      email,
      password,

      options: { emailRedirectTo: redirectUrl.toString() },
    });

    if (signupError) {
      throw signupError;
    }

    if (!data || data.user === null) {
      throw new Error("Failed to sign up user. Please try again");
    }

    const base_name = email.split("@")[0];
    const username = base_name + data.user.id.split("-")[0];

    // update the user's username and display_name
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: data.user.id, username, display_name: base_name })
      .select();

    if (error) {
      throw error;
    }

    return res.status(201).json({ data: "User created successfully" });
  } catch (error: unknown) {
    if (error instanceof AuthError) {
      return res.status(401).json({ error: error.message });
    }

    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function logout(req: Request, res: Response) {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    const cookies = req.cookies;

    if (cookies.jrt) {
      res.clearCookie("jrt", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      console.log("refresh token cleared");
    }

    return res.status(200).json({ data: "Logout Successful" });
  } catch (error: unknown) {
    if (error instanceof AuthError) {
      return res.status(401).json({ error: error.message });
    }

    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

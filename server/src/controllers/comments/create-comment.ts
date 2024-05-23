import { HttpStatusCode } from "@/types";
import { Request, Response } from "express";

export async function createComment(req: Request, res: Response) {
  try {
    console.log(req.body);

    res.status(HttpStatusCode.CREATED).json({ data: "Comment created" });
  } catch (error) {}
}

import { Request, Response } from "express";

export async function login(req: Request, res: Response) {
  console.log(req.body);

  res.status(200).json({
    data: {
      user: { id: "1", email: " user1@test.com" },
      token: { access_token: " access_token", expiry: " expiry" },
    },
  });
}

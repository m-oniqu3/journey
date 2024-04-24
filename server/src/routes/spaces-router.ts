import { requireAuth } from "@/middleware/auth";
import express from "express";

const router = express.Router();

router.post("/new", requireAuth, async (req, res) => {
  console.log(req.body);

  res.status(200).json({ message: "Space created" });
});

export default router;

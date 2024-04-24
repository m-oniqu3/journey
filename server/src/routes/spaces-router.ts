import { createSpace } from "@/controllers/spaces-controller";
import { requireAuth } from "@/middleware/auth";
import express from "express";

const router = express.Router();

router.post("/new", requireAuth, createSpace);

export default router;

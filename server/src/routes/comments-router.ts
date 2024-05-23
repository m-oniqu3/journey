import { createComment } from "@/controllers/comments/create-comment";
import { requireAuth } from "@/middleware/auth";
import { checkIfPostExists } from "@/middleware/post";
import express from "express";

const router = express.Router();

router.post("/", requireAuth, checkIfPostExists, createComment);

export default router;

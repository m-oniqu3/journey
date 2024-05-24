import { createComment } from "@/controllers/comments/create-comment";
import { getComments } from "@/controllers/comments/get-comments";
import { requireAuth } from "@/middleware/auth";
import { checkIfPostExists } from "@/middleware/post";
import express from "express";

const router = express.Router();

router.post("/", requireAuth, checkIfPostExists, createComment);
router.get("/:postID", requireAuth, getComments);

export default router;

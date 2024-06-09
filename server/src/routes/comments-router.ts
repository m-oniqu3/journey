import { createComment } from "@/controllers/comments/create-comment";
import { getComments } from "@/controllers/comments/get-comments";
import { getCommentsCount } from "@/controllers/comments/get-comments-count";
import { GetRepliesForComment } from "@/controllers/comments/get-replies";
import { requireAuth } from "@/middleware/auth";
import { checkIfPostExists } from "@/middleware/post";
import express from "express";

const router = express.Router();

router.post("/", requireAuth, checkIfPostExists, createComment);
router.get("/count/:postID", requireAuth, getCommentsCount);
router.get("/replies/:commentID", requireAuth, GetRepliesForComment);
router.get("/:postID", requireAuth, getComments);

export default router;

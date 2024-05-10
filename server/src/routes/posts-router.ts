import { createPost } from "@/controllers/posts/create-post";
import { getSpacePosts } from "@/controllers/posts/get-space-posts";
import { requireAuth } from "@/middleware/auth";
import { checkSpaceExists } from "@/middleware/space";
import express from "express";
import multer from "multer";

const router = express.Router();

// Store uploaded files in memory
const storage = multer.memoryStorage();

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

router.post(
  "/new/:name",
  upload.array("images", 4),
  requireAuth,
  checkSpaceExists,
  createPost
);

router.get("/:name", requireAuth, checkSpaceExists, getSpacePosts);
export default router;

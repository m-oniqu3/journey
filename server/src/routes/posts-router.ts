import { createPost } from "@/controllers/posts/create-post";
import { getPostById } from "@/controllers/posts/get-post";
import { getPosts } from "@/controllers/posts/get-posts";
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

router.get("/", requireAuth, getPosts);
router.post(
  "/new/:name",
  upload.array("images", 4),
  requireAuth,
  checkSpaceExists,
  createPost
);

// get single post by id, use /post/:id to avoid conflict with /:name
router.get("/post/:id", requireAuth, getPostById);

// get posts by space name
router.get("/space/:name", requireAuth, checkSpaceExists, getSpacePosts);

export default router;

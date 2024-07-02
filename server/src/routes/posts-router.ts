import { addRecentPost } from "@/controllers/posts/add-recent-post";
import { clearRecentPost } from "@/controllers/posts/clear-recent-post";
import { createPost } from "@/controllers/posts/create-post";
import { getPostById } from "@/controllers/posts/get-post";
import { getPosts } from "@/controllers/posts/get-posts";
import { getPostsForJoinedSpaces } from "@/controllers/posts/get-posts-joined-spaces";
import { getRecentPosts } from "@/controllers/posts/get-recent-post";
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

// get posts for spaces that the user is a member of
router.get("/joined", requireAuth, getPostsForJoinedSpaces);

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

// add recent posts
router.post("/recent", requireAuth, addRecentPost);

router.get("/recent", requireAuth, getRecentPosts);

router.delete("/recent", requireAuth, clearRecentPost);

export default router;

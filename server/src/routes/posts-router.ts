import { createPost } from "@/controllers/posts/create-post";
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
export default router;

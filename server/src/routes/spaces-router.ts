import {
  createSpace,
  getSpaceDetails,
  getUsersSpaces,
} from "@/controllers/spaces-controller";
import { requireAuth } from "@/middleware/auth";
import { checkSpaceExists } from "@/middleware/space";
import express from "express";

const router = express.Router();

router.post("/new", requireAuth, createSpace);
router.get("/:name", requireAuth, checkSpaceExists, getSpaceDetails);
router.get("/user/:userID", requireAuth, getUsersSpaces);

export default router;

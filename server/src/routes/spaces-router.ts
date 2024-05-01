import {
  createSpace,
  getAllSpaces,
  getSpaceDetails,
  getUsersSpaces,
  joinSpace,
  leaveSpace,
} from "@/controllers/spaces-controller";
import { requireAuth } from "@/middleware/auth";
import { checkSpaceExists } from "@/middleware/space";
import express from "express";

const router = express.Router();

router.get("/", requireAuth, getAllSpaces);
router.post("/new", requireAuth, createSpace);
router.get("/user/:userID", requireAuth, getUsersSpaces);
router.post("/join/:name", requireAuth, checkSpaceExists, joinSpace);
router.post("/leave/:name", requireAuth, checkSpaceExists, leaveSpace);

router.get("/:name", requireAuth, checkSpaceExists, getSpaceDetails);

export default router;

import controller from "@/controllers/spaces";
import { requireAuth } from "@/middleware/auth";
import { checkSpaceExists } from "@/middleware/space";
import express from "express";

const router = express.Router();

router.get("/", requireAuth, controller.getAllSpaces);
router.post("/new", requireAuth, controller.createSpace);
router.get("/user/:userID", requireAuth, controller.getUsersSpaces);
router.post("/join/:name", requireAuth, checkSpaceExists, controller.joinSpace);
router.post(
  "/leave/:name",
  requireAuth,
  checkSpaceExists,
  controller.leaveSpace
);

router.get("/:name", requireAuth, checkSpaceExists, controller.getSpaceDetails);
router.get(
  "/tags/:name",
  requireAuth,
  checkSpaceExists,
  controller.getTagsForSpace
);

export default router;

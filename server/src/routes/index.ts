import express from "express";
import authRouter from "./auth-router";
import commentsRouter from "./comments-router";
import postsRouter from "./posts-router";
import spacesRouter from "./spaces-router";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/spaces", spacesRouter);
router.use("/posts", postsRouter);
router.use("/comments", commentsRouter);

export default router;

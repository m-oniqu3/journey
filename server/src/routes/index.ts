import express from "express";
import authRouter from "./auth-router";
import postsRouter from "./posts-router";
import spacesRouter from "./spaces-router";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/spaces", spacesRouter);
router.use("/posts", postsRouter);

export default router;

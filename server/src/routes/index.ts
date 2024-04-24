import express from "express";
import authRouter from "./auth-router";
import spacesRouter from "./spaces-router";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/spaces", spacesRouter);

export default router;

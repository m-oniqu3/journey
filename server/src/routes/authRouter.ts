import { login } from "@/controllers/authControllers";
import express from "express";

const router = express.Router();

router.post("/", login);

export default router;

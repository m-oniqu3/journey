import { login, logout, register } from "@/controllers/authControllers";
import express from "express";

const router = express.Router();

router.post("/", login);
router.post("/register", register);
router.delete("/", logout);

export default router;

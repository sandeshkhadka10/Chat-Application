import { Router } from "express";
import { getChatStats } from "../controllers/chat.controller.js";
import wrapAsync from "../util/wrapAsync.js";
import { userVerification } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/stats", userVerification, wrapAsync(getChatStats));

export default router;

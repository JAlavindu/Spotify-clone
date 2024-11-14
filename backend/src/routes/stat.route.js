import { Router } from "express";
import { getStats } from "../controller/stat.route.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", protectRoute, requireAdmin, getStats);

export default router;

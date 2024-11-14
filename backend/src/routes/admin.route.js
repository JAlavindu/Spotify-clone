import { Router } from "express";
import {
  checkAdmin,
  createAlbum,
  createSong,
} from "../controller/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { deleteSong } from "../controller/admin.controller.js";

//optimized clean code
const router = Router();

router.use(protectRoute, requireAdmin);

router.get("/check", checkAdmin);

router.get("/songs", createSong);
router.delete("/songs/:id", deleteSong);

router.post("/albums", createAlbum);
router.delete("/albums/:id", deleteSong);

export default router;

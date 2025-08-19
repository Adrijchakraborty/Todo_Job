import express from "express"
import { requireAuth } from "../middleware/protected.js";
import { addNew, deleteOne, editOne, extractJobWithAI, getAll, getOne } from "../controllers/job.controller.js";

const router = express.Router();

router.post("/", requireAuth, addNew);
router.post("/ai", requireAuth, extractJobWithAI);
router.put("/edit/:id", requireAuth, editOne);
router.get("/", requireAuth, getAll);

router.get("/:id", requireAuth, getOne);
router.delete("/:id", requireAuth, deleteOne);

export default router;
import express from "express"
import { requireAuth } from "../middleware/protected.ts";
import { addNew, deleteOne, getAll, getOne } from "../controllers/job.controller.ts";

const router = express.Router();

router.post("/", requireAuth, addNew);
router.get("/", requireAuth, getAll);

router.get("/:id", requireAuth, getOne);
router.delete("/:id", requireAuth, deleteOne);

export default router;
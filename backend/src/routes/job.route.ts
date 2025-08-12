import express from "express"
import { requireAuth } from "../middleware/protected.ts";
import { addNew, deleteOne, editOne, getAll, getOne } from "../controllers/job.controller.ts";

const router = express.Router();

router.post("/", requireAuth, addNew);
router.put("/edit/:id", requireAuth, editOne);
router.get("/", requireAuth, getAll);

router.get("/:id", requireAuth, getOne);
router.delete("/:id", requireAuth, deleteOne);

export default router;
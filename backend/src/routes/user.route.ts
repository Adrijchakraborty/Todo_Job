import express from "express"
import { login, logout, register, user } from "../controllers/user.controller.ts";
import { requireAuth } from "../middleware/protected.ts";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get('/logout', logout);

router.get('/', requireAuth ,user);

export default router;
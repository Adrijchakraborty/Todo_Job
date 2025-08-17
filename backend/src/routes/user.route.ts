import express from "express"
import { login, logout, register, user } from "../controllers/user.controller.js";
import { requireAuth } from "../middleware/protected.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get('/logout', logout);

router.get('/', requireAuth ,user);

export default router;
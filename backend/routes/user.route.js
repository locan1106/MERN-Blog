import { Router } from "express";
import { getUser, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = Router();

router.get("/get-all", getUser);
router.put("/update/:id", verifyToken, updateUser);

export default router;

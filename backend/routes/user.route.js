import { Router } from "express";
import {
	deleteUser,
	getUser,
	signOut,
	updateUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = Router();

router.get("/get-all", getUser);
router.put("/update/:id", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.post("/sign-out", signOut);

export default router;

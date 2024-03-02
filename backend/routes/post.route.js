import Router from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
	createPost,
	deletePost,
	getPost,
	updatePost,
} from "../controllers/post.controller.js";

const router = Router();

router.post("/create", verifyToken, createPost);
router.get("/get-posts", verifyToken, getPost);
router.delete("/delete/:postId/:userId", verifyToken, deletePost);
router.put("/update/:postId/:userId", verifyToken, updatePost);

export default router;

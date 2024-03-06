import { Router } from "express";
import {
	createComment,
	deleteComment,
	editComment,
	getComments,
	getPostComments,
	likeComment,
} from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = Router();

router.post("/create", verifyToken, createComment);
router.get("/get-post-comments/:postId", getPostComments);
router.put("/like-comment/:commentId", verifyToken, likeComment);
router.put("/edit-comment/:commentId", verifyToken, editComment);
router.delete("/delete-comment/:commentId", verifyToken, deleteComment);
router.get("/get-comments", verifyToken, getComments);

export default router;

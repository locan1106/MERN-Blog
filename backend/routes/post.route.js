import Router from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createPost, getPost } from "../controllers/post.controller.js";

const router = Router();

router.post("/create", verifyToken, createPost);
router.get("/get-posts", verifyToken, getPost);

export default router;

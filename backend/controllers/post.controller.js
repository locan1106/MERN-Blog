import Post from "../models/post.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const createPost = async (req, res, next) => {
	if (!req.user.isAdmin) {
		return next(errorHandler(403, "You are not allowed to create a post"));
	}

	if (!req.body.title) {
		return next(errorHandler(400, "You need to add title for post"));
	}

	if (!req.body.content) {
		return next(errorHandler(400, "You need to add content for post"));
	}

	if (!req.body.category) {
		return next(errorHandler(400, "You need to select category for post"));
	}

	if (!req.body.image) {
		return next(errorHandler(400, "You need to add a image for post"));
	}

	const slug = req.body.title
		.split(" ")
		.join("-")
		.toLowerCase()
		.replace(/[^a-zA-Z0-9-]/g, "");

	const newPost = new Post({
		...req.body,
		slug,
		userId: req.user.id,
	});

	try {
		const savedPost = await newPost.save();
		res.status(201).json(savedPost);
	} catch (error) {
		next(error);
	}
};

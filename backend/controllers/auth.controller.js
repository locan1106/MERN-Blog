import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/errorHandler.js";

export const signUp = async (req, res, next) => {
	const { username, email, password, confirmPassword } = req.body;
	if (
		!username ||
		!email ||
		!password ||
		username === "" ||
		email === "" ||
		password === ""
	) {
		next(errorHandler(400, "You need to fill all fields!"));
		return;
	}

	const user = await User.findOne({ username });
	if (user) {
		next(errorHandler(400, "Username already exists"));
		return;
	}

	const hashedPassword = bcryptjs.hashSync(password, 10);

	const newUser = new User({
		username,
		email,
		password: hashedPassword,
	});

	try {
		await newUser.save();
		return res.status(201).json({ message: "New user has been created" });
	} catch (error) {
		next(errorHandler(500, "Internal Server Error"));
		return;
	}
};

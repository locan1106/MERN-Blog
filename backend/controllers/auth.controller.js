import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

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

export const signIn = async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password || email === "" || password === "") {
		next(errorHandler(400, "You need to fill all fields!"));
		return;
	}

	try {
		const validUser = await User.findOne({ email });

		if (!validUser) {
			next(errorHandler(400, "User not found"));
			return;
		}

		const validPassword = bcryptjs.compareSync(password, validUser.password);
		if (!validPassword) {
			next(errorHandler(400, "Password not match"));
			return;
		}

		const token = jwt.sign(
			{
				id: validUser._id,
			},
			process.env.JWT_SECRET
		);

		const { password: pass, ...rest } = validUser._doc;

		res
			.status(200)
			.cookie("access_token", token, {
				httpOnly: true,
			})
			.json(rest);
	} catch (error) {
		next(error);
	}
};

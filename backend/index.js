import express from "express";
import dotenv from "dotenv";
import connectMongoDB from "./database/connect.js";

dotenv.config();

const app = express();

app.listen(3000, () => {
	connectMongoDB();
	console.log("Server is running on port 3000!");
});

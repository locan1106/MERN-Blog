import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

const SignUp = () => {
	return (
		<div className="min-h-screen mt-20">
			<div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row gap-5 md:items-center">
				{/* Left side*/}
				<div className="flex-1">
					<div className="font-bold dark:text-white text-4xl">
						<span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
							LocAn&apos;s
						</span>
						Blog
					</div>
					<p className="text-sm mt-5">
						You can sign up with your email and password or with Google.
					</p>
				</div>

				{/* Right side */}
				<div className="mt-4 md:mt-0 flex-1">
					<form className="flex flex-col gap-4">
						<div>
							<Label value="Your username" />
							<TextInput
								type="text"
								placeholder="Enter your username"
								id="username"
							/>
						</div>
						<div>
							<Label value="Your email" />
							<TextInput
								type="text"
								placeholder="Enter your email"
								id="email"
							/>
						</div>
						<div>
							<Label value="Your password" />
							<TextInput
								type="text"
								placeholder="Enter your password"
								id="password"
							/>
						</div>
						<Button gradientDuoTone="purpleToPink" type="submit">
							Sign Up
						</Button>
					</form>
					<div className="flex gap-2 text-sm mt-5">
						<span>Have an account?</span>
						<Link to="/sign-in" className="text-blue-500 hover:underline">
							Sign In
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUp;

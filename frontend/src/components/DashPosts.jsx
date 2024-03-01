import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const DashPosts = () => {
	const { currentUser } = useSelector((state) => state.user);
	const [posts, setPosts] = useState([]);

	console.log(posts);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const res = await fetch(
					`/api/post/get-posts?userId=${currentUser._id}`
				);
				const data = await res.json();

				if (res.ok) {
					setPosts(data.posts);
				}
			} catch (error) {
				console.log(error.message);
			}
		};

		if (currentUser.isAdmin) {
			fetchPosts();
		}
	}, [currentUser._id]);

	return (
		<div className="w-full max-w-[1200px] md:mx-auto table-auto overflow-x-scroll p-3 scrollbar scrollbar-track-slate-300 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-500 dark:scrollbar-thumb-slate-700">
			{currentUser.isAdmin && posts.length > 0 ? (
				<>
					<Table hoverable className="shadow-md">
						<Table.Head>
							<Table.HeadCell> Date update</Table.HeadCell>
							<Table.HeadCell> Post image</Table.HeadCell>
							<Table.HeadCell> Post title</Table.HeadCell>
							<Table.HeadCell> Category</Table.HeadCell>
							<Table.HeadCell>
								<span>Edit</span>
							</Table.HeadCell>
							<Table.HeadCell> Delete</Table.HeadCell>
						</Table.Head>
						<Table.Body className="divide-y">
							{posts.map((post) => (
								<Table.Row
									key={post._id}
									className="bg-white dark:border-gray-700 dark:bg-gray-800">
									<Table.Cell>
										{new Date(post.updatedAt).toLocaleDateString()}
									</Table.Cell>
									<Table.Cell>
										<Link to={"/post/" + post.slug}>
											<img
												src={post.image}
												alt={post.title}
												className="h-10 w-20 object-cover bg-gray-500"
											/>
										</Link>
									</Table.Cell>
									<Table.Cell>
										<Link
											className="font-medium text-gray-900 dark:text-white"
											to={"/post/" + post.slug}>
											{post.title}
										</Link>
									</Table.Cell>
									<Table.Cell>{post.category}</Table.Cell>
									<Table.Cell>
										<Link to={"/update-post/" + post.slug}>
											<span className="hover:underline text-teal-500">
												Edit
											</span>
										</Link>
									</Table.Cell>
									<Table.Cell>
										<span className="hover:underline cursor-pointer font-medium text-red-500">
											Delete
										</span>
									</Table.Cell>
								</Table.Row>
							))}
						</Table.Body>
					</Table>
				</>
			) : (
				<p>You have no Post</p>
			)}
		</div>
	);
};

export default DashPosts;

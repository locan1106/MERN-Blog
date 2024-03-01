import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPost from "../components/DashPost";

const Dashboard = () => {
	const location = useLocation();
	const [tab, setTab] = useState("");

	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const tabFromUrl = urlParams.get("tab");
		if (tabFromUrl) {
			setTab(tabFromUrl);
		}
	}, [location.search]);

	return (
		<div className="min-h-screen flex flex-col md:flex-row ">
			<div className="md:w-56">
				{/* Sidebar */}
				<DashSidebar />
			</div>

			{/* profile */}
			<div className="flex-1">{tab === "profile" && <DashProfile />}</div>

			{/* posts */}
			<div className="flex-1">{tab === "posts" && <DashPost />}</div>
		</div>
	);
};

export default Dashboard;

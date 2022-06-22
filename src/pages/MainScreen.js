import { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import AdditionalNotesScreen from "./AdditionalNotes";
import CaregivingScreen from "./CaregivingScreen";
import HomeMonitoringScreen from "./HomeMonitoringScreen";
import LabResultsScreen from "./LabResultsScreen";
import MedicationScreen from "./MedicationScreen";

const userName = "iCgfe1IHSfDNRC3hfgxF";

export default function MainScreen({ database }) {
	const [path, setPath] = useState("");
	const location = useLocation();

	useEffect(() => {
		const currentPath = window.location.pathname.substring(1);
		if (currentPath != path) {
			setPath(currentPath);
		}
	}, [location]);

	return (
		<div className="mainPage">
			<SideNavBar path={path} />
			<div className="content">
				<Routes>
					<Route
						path="/"
						element={
							<MedicationScreen
								database={database}
								userName={userName}
							/>
						}
					/>
					<Route
						path="homemonitoring"
						element={
							<HomeMonitoringScreen
								database={database}
								userName={userName}
							/>
						}
					/>
					<Route
						path="labresults"
						element={
							<LabResultsScreen
								database={database}
								userName={userName}
							/>
						}
					/>
					<Route
						path="caregiving"
						element={
							<CaregivingScreen
								database={database}
								userName={userName}
							/>
						}
					/>
					<Route
						path="additionalnotes"
						element={
							<AdditionalNotesScreen
								database={database}
								userName={userName}
							/>
						}
					/>
				</Routes>
			</div>
		</div>
	);
}

var screenNames = [
	{
		name: "Medication",
		path: "",
	},
	{
		name: "Home Monitoring",
		path: "homemonitoring",
	},
	{
		name: "Lab Results",
		path: "labresults",
	},
	{
		name: "Caregiving",
		path: "caregiving",
	},
	{
		name: "Care Staff's Comment",
		path: "additionalnotes",
	},
];

function SideNavBar({ path }) {
	var toggles = [];
	for (let i = 0; i < screenNames.length; i++) {
		if (screenNames[i].path === path) {
			toggles.push(
				<Link
					to={screenNames[i].path}
					className="sideNavText sideNavTextSelected"
					key={i}
				>
					{screenNames[i].name}
				</Link>
			);
		} else {
			toggles.push(
				<Link to={screenNames[i].path} className="sideNavText" key={i}>
					{screenNames[i].name}
				</Link>
			);
		}
	}
	return <div className="sideNav">{toggles}</div>;
}

import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import PublishModal from "../components/publish/PublishModal";
import AdditionalNotesScreen from "./AdditionalNotesScreen";
import CaregivingScreen from "./CaregivingScreen";
import DefaultArticleScreen from "./DefaultArticlesScreen";
import HomeMonitoringScreen from "./HomeMonitoringScreen";
import LabResultsScreen from "./LabResultsScreen";
import MedicationScreen from "./MedicationScreen";

export default function MainScreen({
	database,
	userName,
	setUserName,
	name,
	setName,
}) {
	const [path, setPath] = useState("");
	const [showPublishModal, setShowPublishModal] = useState(false);
	const location = useLocation();

	useEffect(() => {
		const currentPath = window.location.pathname.substring(1);
		if (currentPath !== path) {
			setPath(currentPath);
		}
	}, [location]);

	return (
		<div className="mainPage">
			<SideNavBar
				path={path}
				setUserName={setUserName}
				name={name}
				setName={setName}
				setShowPublishModal={setShowPublishModal}
			/>
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
					<Route
						path="tool"
						element={<DefaultArticleScreen database={database} />}
					/>
				</Routes>
			</div>
			<PublishModal
				show={showPublishModal}
				setShow={setShowPublishModal}
				database={database}
				userName={userName}
			/>
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

function SideNavBar({ path, setUserName, name, setName, setShowPublishModal }) {
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
	return (
		<div className="sideNav">
			<div style={{ padding: 20 }}>
				<p style={{ fontSize: 20, fontWeight: 500 }}>{name}</p>
				<p
					className="toggle"
					onClick={() => {
						setUserName(null);
						setName(null);
					}}
				>
					← Back to Dashboard
				</p>
				<br />
				<div className="line" />
			</div>
			{toggles}
			<div style={{ padding: 20 }}>
				<div className="line" />
				<br />
				<Button
					style={{ width: "100%" }}
					onClick={() => {
						setShowPublishModal(true);
					}}
				>
					Publish
				</Button>
			</div>
		</div>
	);
}

import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import QRCode from "react-qr-code";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import ClearAllModal from "../components/clear/ClearAllModal";
import PreviewModal from "../components/publish/PreviewModal";
import PublishModal from "../components/publish/PublishModal";
import AdditionalNotesScreen from "./AdditionalNotesScreen";
import HomeMonitoringScreen from "./HomeMonitoringScreen";
import LabResultsScreen from "./LabResultsScreen";
import MedicationScreen from "./MedicationScreen";
import RecordingsScreen from "./RecordingsScreen";

export default function MainScreen({
	database,
	storage,
	userName,
	setUserName,
	name,
	setName,
}) {
	const [path, setPath] = useState("");
	const [showPublishModal, setShowPublishModal] = useState(false);
	const [showClearAllModal, setShowClearAllModal] = useState(false);
	const [showPreviewModal, setShowPreviewModal] = useState(false);
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
				userName={userName}
				setUserName={setUserName}
				name={name}
				setName={setName}
				setShowPublishModal={setShowPublishModal}
				setShowClearAllModal={setShowClearAllModal}
				setShowPreviewModal={setShowPreviewModal}
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
						path="article"
						element={
							<HomeMonitoringScreen
								database={database}
								userName={userName}
								storage={storage}
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
						path="additionalnotes"
						element={
							<AdditionalNotesScreen
								database={database}
								userName={userName}
							/>
						}
					/>
					<Route
						path="recordings"
						element={
							<RecordingsScreen
								database={database}
								userName={userName}
							/>
						}
					/>
				</Routes>
			</div>
			<ClearAllModal
				show={showClearAllModal}
				setShow={setShowClearAllModal}
				database={database}
				userName={userName}
			/>
			<PreviewModal
				show={showPreviewModal}
				setShow={setShowPreviewModal}
				setShowPublishModal={setShowPublishModal}
				user={userName}
			/>
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
		name: "Article",
		path: "article",
	},
	{
		name: "Lab Results",
		path: "labresults",
	},
	{
		name: "Care Staff's Comment",
		path: "additionalnotes",
	},
];

function SideNavBar({
	path,
	userName,
	setUserName,
	name,
	setName,
	setShowPublishModal,
	setShowClearAllModal,
	setShowPreviewModal,
}) {
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

	function RecordingsToggle() {
		if (path == "recordings") {
			return (
				<Link
					to="recordings"
					className="sideNavText sideNavTextSelected"
				>
					Recordings
				</Link>
			);
		} else {
			return (
				<Link to="recordings" className="sideNavText">
					Recordings
				</Link>
			);
		}
	}

	return (
		<div className="sideNav">
			<div style={{ padding: 20 }}>
				<a
					class="toggle"
					href={"https://eim319.web.app/home/" + userName}
					target="_blank"
					style={{ textDecoration: "none" }}
				>
					<QRCode
						value={"https://eim319.web.app/home/" + userName}
						size={120}
						style={{ width: "100%" }}
					/>
					<p
						style={{
							marginTop: 10,
							color: "black",
							opacity: 0.7,
						}}
					>
						Click to open
					</p>
				</a>
				<p style={{ fontSize: 20, fontWeight: 500, marginTop: 20 }}>
					{name}
				</p>
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
			<RecordingsToggle />
			<div style={{ padding: 20 }}>
				<div className="line" />
			</div>
			{toggles}
			<div style={{ padding: "20px 20px 0px 20px" }}>
				<Button
					style={{ width: "100%" }}
					variant="outline-danger"
					onClick={() => {
						setShowClearAllModal(true);
					}}
				>
					Clear All
				</Button>
			</div>
			<div style={{ padding: 20 }}>
				<div className="line" />
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					padding: "0px 20px 20px 20px",
				}}
			>
				<Button
					style={{ flexGrow: 100 }}
					onClick={() => {
						setShowPublishModal(true);
					}}
				>
					Publish
				</Button>
				<Button
					style={{
						marginLeft: 10,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
					}}
					variant="secondary"
					onClick={() => {
						setShowPreviewModal(true);
					}}
				>
					<FaEye />
				</Button>
			</div>
		</div>
	);
}

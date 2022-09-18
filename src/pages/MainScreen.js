import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import QRCode from "react-qr-code";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import ClearAllModal from "../components/clear/ClearAllModal";
import PreviewModal from "../components/publish/PreviewModal";
import PublishModal from "../components/publish/PublishModal";
import Status from "../components/Status";
import AdditionalNotesScreen from "./AdditionalNotesScreen";
import HomeMonitoringScreen from "./HomeMonitoringScreen";
import InPatientScreen from "./InPatientScreen";
import LabResultsScreen from "./LabResultsScreen";
import MedicationScreen from "./MedicationScreen";
import RecordingsScreen from "./RecordingsScreen";
import { doc, getDoc } from "firebase/firestore/lite";
import LoadingComponent from "../components/LoadingComponent";

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
	const [status, setStatus] = useState();

	const location = useLocation();

	useEffect(() => {
		const currentPath = window.location.pathname.substring(1);
		if (currentPath !== path) {
			setPath(currentPath);
		}
	}, [location]);

	useEffect(() => {
		getStatus(database, userName, setStatus);
	}, [userName]);

	if (status === undefined) return <LoadingComponent />;

	return (
		<div className="mainPage">
			<SideNavBar
				path={path}
				userName={userName}
				setUserName={setUserName}
				name={name}
				setName={setName}
				database={database}
				status={status}
				setShowPublishModal={setShowPublishModal}
				setShowClearAllModal={setShowClearAllModal}
				setShowPreviewModal={setShowPreviewModal}
			/>
			<div className="content">
				<Routes>
					<Route
						path="medication"
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
					<Route
						path="inpatient"
						element={
							<InPatientScreen
								database={database}
								userName={userName}
								status={status}
								setStatus={setStatus}
							/>
						}
					/>
					<Route
						path="/"
						element={
							status === null ? (
								<Navigate to="medication" replace />
							) : (
								<Navigate to="inpatient" replace />
							)
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
		path: "medication",
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
	database,
	status,
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

	function InPatientToggle() {
		if (path == "inpatient") {
			return (
				<Link
					to="inpatient"
					className="sideNavText sideNavTextSelected"
				>
					In Patient
				</Link>
			);
		} else {
			return (
				<Link to="inpatient" className="sideNavText">
					In Patient
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
				<p
					className="toggle"
					style={{ fontWeight: 500 }}
					onClick={() => {
						setUserName(null);
						setName(null);
					}}
				>
					← Back to Dashboard
				</p>
				<br />
				<a
					className="toggle"
					href={"https://eim319.web.app/home/" + userName}
					target="_blank"
					style={{ textDecoration: "none" }}
				>
					<QRCode
						value={"https://eim319.web.app/home/" + userName}
						size={120}
						style={{ width: "100%" }}
					/>
				</a>
				<p style={{ fontSize: 25, fontWeight: 500, marginTop: 20 }}>
					{name}
				</p>
				<Status
					database={database}
					userName={userName}
					status={status}
				/>
			</div>
			<InPatientToggle />
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

async function getStatus(database, userName, setStatus) {
	const ref = doc(database, "hospitalization", userName);
	const status = await getDoc(ref);
	if (!status.exists()) {
		setStatus(null);
	} else {
		var data = status.data();
		setStatus(data);
	}
}

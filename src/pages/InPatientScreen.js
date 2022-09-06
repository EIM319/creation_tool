import { Button, Dropdown, InputGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import LoadingComponent from "../components/LoadingComponent";
import {
	deleteDoc,
	doc,
	setDoc,
	getDoc,
	collection,
} from "firebase/firestore/lite";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import { FaSave } from "react-icons/fa";

export default function InPatientScreen({
	database,
	userName,
	status,
	setStatus,
}) {
	const [isSaving, setSaving] = useState(false);
	const [ward, setWard] = useState("");

	useEffect(() => {
		setSaving(false);
	}, userName);

	useEffect(() => {
		if (status !== null && status !== undefined) {
			setWard(status.ward);
		}
	}, [status]);

	async function setHospitalized(isDischarging) {
		setSaving(true);
		const ref = doc(database, "hospitalization", userName);
		const newStatus = Object.assign({}, defaultStatus);
		newStatus.isDischarging = isDischarging;
		if (isDischarging) {
			var date = new Date();
			date.setDate(date.getDate() + 1);
			newStatus.dischargeDate = date.toDateString();
			await sendNotification(newStatus, userName, database);
		} else {
			newStatus.dischargeDate = null;
		}
		await setDoc(ref, newStatus);
		setStatus(newStatus);
		setSaving(false);
	}

	async function setDischarged() {
		setSaving(true);
		const ref = doc(database, "hospitalization", userName);
		await deleteDoc(ref);
		setStatus(null);
		setSaving(false);
	}

	async function saveWard() {
		setSaving(true);
		const ref = doc(database, "hospitalization", userName);
		const newStatus = Object.assign({}, status);
		newStatus.ward = ward;
		await setDoc(ref, newStatus);
		setStatus(newStatus);
		setSaving(false);
	}

	if (isSaving || status === undefined) return <LoadingComponent />;
	if (status === null) {
		return (
			<div
				style={{
					height: "100vh",
					width: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<p>
					Patient is currently discharged. Change status to
					hospitalized?
				</p>
				<Button
					variant="danger"
					onClick={() => {
						setHospitalized(false);
					}}
				>
					Confirm
				</Button>
			</div>
		);
	}

	if (status.isDischarging) {
		return (
			<div style={{ padding: 20 }}>
				<p>Patient will be discharged on {status.dischargeDate}.</p>
				<Button
					variant="danger"
					style={{ marginRight: 10 }}
					onClick={setDischarged}
				>
					Discharge
				</Button>
				<Button
					variant="secondary"
					onClick={() => {
						setHospitalized(false);
					}}
				>
					Cancel
				</Button>
			</div>
		);
	}

	const wards = [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"11",
		"12",
		"14",
		"16",
		"17",
		"18",
	];

	function WardSelector() {
		const array = [];
		wards.forEach((name) => {
			array.push(
				<Dropdown.Item
					key={name}
					active={ward === name}
					onClick={() => {
						setWard(name);
					}}
				>
					{name}
				</Dropdown.Item>
			);
		});
		return array;
	}

	return (
		<div style={{ padding: 20, display: "flex", flexDirection: "column" }}>
			<b style={{ paddingBottom: 10, fontSize: 20 }}>Ward</b>
			<InputGroup style={{ paddingBottom: 10 }}>
				<Dropdown>
					<Dropdown.Toggle id="ward" variant="outline-secondary">
						{ward}
					</Dropdown.Toggle>
					<DropdownMenu>
						<WardSelector />
					</DropdownMenu>
				</Dropdown>

				<Button
					variant="secondary"
					style={{ width: "fit-content" }}
					onClick={() => {
						saveWard();
					}}
				>
					<FaSave />
				</Button>
			</InputGroup>

			<br />
			<div className="line" />
			<br />
			<Button
				style={{ width: "fit-content" }}
				onClick={() => {
					setHospitalized(true);
				}}
			>
				Schedule Discharge
			</Button>
		</div>
	);
}

const defaultStatus = {
	isDischarging: false,
	ward: "1",
	dischargeDate: null,
};

async function sendNotification(status, userName, database) {
	const ref = doc(database, "notification", userName);
	const result = await getDoc(ref);
	if (!result.exists()) return;
	const userToken = result.data().notificationKey;
	if (userToken === undefined || userToken === null) return;
	const message = {
		notification: {
			title: "Care Synopsis Alert",
			body: "Patient will be discharged on " + status.dischargeDate + ".",
		},
		to: userToken,
	};
	await fetch("https://fcm.googleapis.com/fcm/send", {
		method: "POST",
		headers: {
			Authorization:
				"key=AAAA-fp04k4:APA91bGRXVM73uayUJ7pl85HQpomtql8WFar9pd9cEGopO98pS58BGVbFaV1E5Z47NPd1jz6P26TBzfbJ3P1PRdO7AJx5YPbLzo7Kz9-Kb62duMdckEGXQWmyn1v2pIIAEjhIjgQ0ACE",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(message),
	});
}

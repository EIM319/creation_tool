import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import LoadingComponent from "../components/LoadingComponent";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore/lite";

export default function InPatientScreen({
	database,
	userName,
	status,
	setStatus,
}) {
	const [isSaving, setSaving] = useState(false);

	useEffect(() => {
		setSaving(false);
	}, userName);

	async function setHospitalized(isDischarging) {
		setSaving(true);
		const ref = doc(database, "hospitalization", userName);
		const newStatus = Object.assign({}, defaultStatus);
		newStatus.isDischarging = isDischarging;
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
				<p>Patient will be discharged tomorrow</p>
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

	return (
		<div style={{ padding: 20 }}>
			<Button
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
	ward: "",
};

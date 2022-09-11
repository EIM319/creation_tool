import { useState, useEffect } from "react";
import LoadingComponent from "../components/LoadingComponent";
import { doc, setDoc, getDoc } from "firebase/firestore/lite";
import DischargedComponent from "../components/inpatient/DischargedComponent";
import HospitalizedComponent from "../components/inpatient/HospitalizedComponent";
import DischargingComponent from "../components/inpatient/DischargingComponent";

export default function InPatientScreen({
	database,
	userName,
	status,
	setStatus,
}) {
	const [isSaving, setSaving] = useState(false);

	useEffect(() => {
		setSaving(false);
	}, [userName]);

	async function setHospitalized(isDischarging, current) {
		setSaving(true);
		const ref = doc(database, "hospitalization", userName);
		const newStatus = Object.assign({}, current);
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

	if (isSaving || status === undefined) return <LoadingComponent />;
	if (status === null) {
		return <DischargedComponent setHospitalized={setHospitalized} />;
	}

	if (status.isDischarging) {
		return (
			<DischargingComponent
				status={status}
				setStatus={setStatus}
				setHospitalized={setHospitalized}
				setSaving={setSaving}
				database={database}
				userName={userName}
			/>
		);
	}

	return (
		<HospitalizedComponent
			status={status}
			setStatus={setStatus}
			setHospitalized={setHospitalized}
			setSaving={setSaving}
			database={database}
			userName={userName}
		/>
	);
}

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

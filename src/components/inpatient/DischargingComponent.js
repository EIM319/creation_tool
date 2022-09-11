import { Button, Dropdown, InputGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import { deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FaSave } from "react-icons/fa";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DischargeInfoSelector from "./DischargeInfoSelector";

export default function DischargingComponent({
	setHospitalized,
	status,
	setStatus,
	setSaving,
	database,
	userName,
}) {
	const dischargeTimes = ["10:00 am", "10:30 am", "11:00 am"];
	const [dischargeTime, setDischargeTime] = useState(dischargeTimes[0]);

	useEffect(() => {
		if (status !== null && status !== undefined) {
			setDischargeTime(status.dischargeTime);
		}
	}, [status]);

	function TimeSelector() {
		const array = [];
		dischargeTimes.forEach((time) => {
			array.push(
				<Dropdown.Item
					key={time}
					active={dischargeTime === time}
					onClick={() => {
						setDischargeTime(time);
					}}
				>
					{time}
				</Dropdown.Item>
			);
		});
		return array;
	}

	async function setDischarged() {
		setSaving(true);
		const ref = doc(database, "hospitalization", userName);
		await deleteDoc(ref);
		setStatus(null);
		setSaving(false);
	}

	async function saveDischargeTime() {
		setSaving(true);
		const ref = doc(database, "hospitalization", userName);
		const newStatus = Object.assign({}, status);
		newStatus.dischargeTime = dischargeTime;
		await setDoc(ref, newStatus);
		setStatus(newStatus);
		setSaving(false);
	}

	return (
		<div style={{ padding: 20 }}>
			<p>Patient will be discharged on {status.dischargeDate}.</p>
			<InputGroup>
				<InputGroup.Text>Discharge Time</InputGroup.Text>
				<Dropdown>
					<Dropdown.Toggle id="time" variant="outline-secondary">
						{dischargeTime}
					</Dropdown.Toggle>
					<DropdownMenu>
						<TimeSelector />
					</DropdownMenu>
					<Button
						variant="secondary"
						style={{ width: "fit-content" }}
						onClick={() => {
							saveDischargeTime();
						}}
					>
						<FaSave />
					</Button>
				</Dropdown>
			</InputGroup>
			<br />
			<DischargeInfoSelector
				status={status}
				setStatus={setStatus}
				setSaving={setSaving}
				userName={userName}
				database={database}
			/>

			<br />
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
					setHospitalized(false, status);
				}}
			>
				Cancel
			</Button>
		</div>
	);
}

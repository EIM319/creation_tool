import { Button, Dropdown, InputGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import { deleteDoc, doc, setDoc } from "firebase/firestore/lite";
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
						saveDischargeTime(time);
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

	async function saveDischargeTime(newTime) {
		setSaving(true);
		const ref = doc(database, "hospitalization", userName);
		const newStatus = Object.assign({}, status);
		newStatus.dischargeTime = newTime;
		await setDoc(ref, newStatus);
		setStatus(newStatus);
		setDischargeTime(newTime);
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
			{status.acknowledge === true ? (
				<p style={{ fontWeight: 500 }}>Message has been read.</p>
			) : (
				<p style={{ fontWeight: 500 }}>
					Patient's family has not read the message.
				</p>
			)}

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

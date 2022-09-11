import { useState, useEffect } from "react";
import { Button, Dropdown, InputGroup, Form } from "react-bootstrap";
import { doc, setDoc } from "firebase/firestore/lite";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import { FaSave } from "react-icons/fa";

export default function HospitalizedComponent({
	setHospitalized,
	status,
	setStatus,
	setSaving,
	database,
	userName,
}) {
	const [ward, setWard] = useState("");
	const [bed, setBed] = useState(1);

	useEffect(() => {
		if (status !== null && status !== undefined) {
			setWard(status.ward);
			setBed(status.bed);
		}
	}, [status]);

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

	async function saveWard() {
		setSaving(true);
		const ref = doc(database, "hospitalization", userName);
		const newStatus = Object.assign({}, status);
		newStatus.ward = ward;
		newStatus.bed = bed;
		await setDoc(ref, newStatus);
		setStatus(newStatus);
		setSaving(false);
	}

	return (
		<div style={{ padding: 20, display: "flex", flexDirection: "column" }}>
			<b style={{ paddingBottom: 10, fontSize: 20 }}>Location</b>
			<InputGroup style={{ paddingBottom: 10, width: 270 }}>
				<InputGroup.Text id="inputGroup-sizing-sm">
					Ward
				</InputGroup.Text>
				<Dropdown>
					<Dropdown.Toggle id="ward" variant="outline-secondary">
						{ward}
					</Dropdown.Toggle>
					<DropdownMenu>
						<WardSelector />
					</DropdownMenu>
				</Dropdown>
				<InputGroup.Text id="inputGroup-sizing-sm">Bed</InputGroup.Text>
				<Form.Control
					type="Number"
					value={bed}
					onChange={(event) => {
						setBed(event.target.value);
					}}
				/>

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
					setHospitalized(true, status);
				}}
			>
				Schedule Discharge
			</Button>
		</div>
	);
}

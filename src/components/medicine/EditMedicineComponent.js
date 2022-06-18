import { doc, updateDoc } from "firebase/firestore/lite";
import { useState, useEffect } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";

export default function EditMedicineComponent({
	selectedMedicine,
	medication,
	setMedication,
	database,
	userName,
}) {
	const [purpose, setPurpose] = useState("");
	const [sideEffects, setSideEffects] = useState([]);

	useEffect(() => {
		if (selectedMedicine === undefined) return;
		setPurpose(selectedMedicine.purpose);
		setSideEffects(selectedMedicine.side_effects);
	}, [selectedMedicine]);

	async function save() {
		if (selectedMedicine === undefined) return;
		const newMedicine = new Object(selectedMedicine);
		newMedicine.purpose = purpose;
		newMedicine.side_effects = sideEffects;
		const newMedicationList = [...medication];
		newMedicationList.forEach((medicine) => {
			if (medicine.name === newMedicine) {
				medicine = newMedicine;
			}
		});
		const ref = doc(database, "users", userName);
		await updateDoc(ref, {
			medication: newMedicationList,
		}).then(() => {
			setMedication(newMedicationList);
		});
	}

	if (selectedMedicine !== undefined) {
		return (
			<div style={{ display: "flex", flexDirection: "column" }}>
				<b>Name:</b>
				<p>{selectedMedicine.name}</p>
				<b>Purpose</b>
				<InputGroup>
					<FormControl
						value={purpose}
						onChange={(event) => {
							setPurpose(event.target.value);
						}}
					/>
				</InputGroup>
				<br />
				<b>Side Effects</b>
				<SideEffects
					sideEffects={sideEffects}
					setSideEffects={setSideEffects}
				/>
				<br />
				<Button onClick={save}>Save</Button>
			</div>
		);
	} else {
		return null;
	}
}

function SideEffects({ sideEffects, setSideEffects }) {
	if (sideEffects === undefined) return null;
	const array = [];
	for (let i = 0; i < sideEffects.length; i++) {
		array.push(
			<InputGroup style={{ marginBottom: 10 }}>
				<Button
					onClick={() => {
						const newSideEffects = [...sideEffects];
						newSideEffects.splice(i, 1);
						setSideEffects(newSideEffects);
					}}
				>
					X
				</Button>
				<FormControl
					value={sideEffects[i]}
					onChange={(event) => {
						const newSideEffects = [...sideEffects];
						newSideEffects[i] = event.target.value;
						setSideEffects(newSideEffects);
					}}
				/>
			</InputGroup>
		);
	}
	array.push(
		<Button
			style={{ marginBottom: 10 }}
			onClick={() => {
				const newSideEffects = [...sideEffects];
				newSideEffects.push("");
				setSideEffects(newSideEffects);
			}}
		>
			Add
		</Button>
	);
	return array;
}

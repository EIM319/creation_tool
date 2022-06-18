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
	const [extras, setExtras] = useState([]);

	useEffect(() => {
		if (selectedMedicine === undefined) return;
		setPurpose(selectedMedicine.purpose);
		setSideEffects(selectedMedicine.side_effects);
		setExtras(selectedMedicine.extras);
	}, [selectedMedicine]);

	async function save() {
		if (selectedMedicine === undefined) return;
		const newMedicine = new Object(selectedMedicine);
		newMedicine.purpose = purpose;
		newMedicine.side_effects = sideEffects;
		newMedicine.extras = extras;
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
				<b>Dosage:</b>
				<p>{selectedMedicine.dosage}</p>
				<b>Side Effects</b>
				<SideEffects
					sideEffects={sideEffects}
					setSideEffects={setSideEffects}
				/>
				<b>Extra Notes</b>
				<Extras extras={extras} setExtras={setExtras} />
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
			variant="secondary"
		>
			Add
		</Button>
	);
	return array;
}

function Extras({ extras, setExtras }) {
	if (extras === undefined) return null;
	const array = [];
	for (let i = 0; i < extras.length; i++) {
		array.push(
			<div>
				<InputGroup style={{ marginBottom: 5 }}>
					<Button
						onClick={() => {
							const newExtras = [...extras];
							newExtras.splice(i, 1);
							setExtras(newExtras);
						}}
					>
						X
					</Button>
					<FormControl
						value={extras[i].header}
						onChange={(event) => {
							const newExtras = [...extras];
							const newExtra = new Object(newExtras[i]);
							newExtra.header = event.target.value;
							newExtras[i] = newExtra;
							setExtras(newExtras);
						}}
					/>
				</InputGroup>
				<FormControl
					style={{ marginBottom: 10 }}
					value={extras[i].content}
					onChange={(event) => {
						const newExtras = [...extras];
						const newExtra = new Object(newExtras[i]);
						newExtra.content = event.target.value;
						newExtras[i] = newExtra;
						setExtras(newExtras);
					}}
				/>
			</div>
		);
	}
	array.push(
		<Button
			style={{ marginBottom: 10 }}
			onClick={() => {
				const newExtras = [...extras];
				newExtras.push({ header: "", content: "" });
				setExtras(newExtras);
			}}
			variant="secondary"
		>
			Add
		</Button>
	);
	return array;
}

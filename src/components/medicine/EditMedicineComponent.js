import { doc, updateDoc } from "firebase/firestore/lite";
import { useState, useEffect } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { FaSave } from "react-icons/fa";
import { toast } from "react-toastify";

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
			if (medicine.name === newMedicine.name) {
				medicine = newMedicine;
			}
		});
		const ref = doc(database, "users", userName);
		await updateDoc(ref, {
			medication: newMedicationList,
		}).then(() => {
			setMedication(newMedicationList);
			toast.success("Save Successful");
		});
	}

	if (selectedMedicine !== undefined) {
		return (
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					height: "100vh",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						padding: 30,
					}}
				>
					<p style={{ fontSize: 30, margin: 0 }}>
						{selectedMedicine.name}
					</p>
					<FaSave size={30} onClick={save} className="toggle" />
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						overflowY: "auto",
						padding: "0px 30px 0px 30px",
					}}
				>
					<b style={{ paddingBottom: 10, fontSize: 20 }}>Purpose</b>
					<InputGroup>
						<FormControl
							value={purpose}
							onChange={(event) => {
								setPurpose(event.target.value);
							}}
						/>
					</InputGroup>
					<br />
					<b style={{ paddingBottom: 5, fontSize: 20 }}>Dosage</b>
					<p>{selectedMedicine.dosage}</p>
					<br />
					<b style={{ paddingBottom: 10, fontSize: 20 }}>
						Side Effects
					</b>
					<SideEffects
						sideEffects={sideEffects}
						setSideEffects={setSideEffects}
					/>
					<br />

					<b style={{ paddingBottom: 10, fontSize: 20 }}>
						Extra Notes
					</b>
					<Extras extras={extras} setExtras={setExtras} />
					<br />
				</div>
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
				<FormControl
					as="textarea"
					value={sideEffects[i]}
					onChange={(event) => {
						const newSideEffects = [...sideEffects];
						newSideEffects[i] = event.target.value;
						setSideEffects(newSideEffects);
					}}
				/>
				<Button
					variant="danger"
					onClick={() => {
						const newSideEffects = [...sideEffects];
						newSideEffects.splice(i, 1);
						setSideEffects(newSideEffects);
					}}
				>
					X
				</Button>
			</InputGroup>
		);
	}
	array.push(
		<Button
			style={{ width: "fit-content" }}
			variant="secondary"
			onClick={() => {
				const newSideEffects = [...sideEffects];
				newSideEffects.push("");
				setSideEffects(newSideEffects);
			}}
		>
			Add Side Effect
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
					<InputGroup.Text>Title</InputGroup.Text>
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
					<Button
						variant="danger"
						onClick={() => {
							const newExtras = [...extras];
							newExtras.splice(i, 1);
							setExtras(newExtras);
						}}
					>
						X
					</Button>
				</InputGroup>
				<FormControl
					as="textarea"
					style={{ marginBottom: 20 }}
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
			style={{ width: "fit-content" }}
			onClick={() => {
				const newExtras = [...extras];
				newExtras.push({ header: "", content: "" });
				setExtras(newExtras);
			}}
			variant="secondary"
		>
			Add Extra Notes
		</Button>
	);
	return array;
}

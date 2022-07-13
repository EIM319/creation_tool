import { doc, updateDoc } from "firebase/firestore/lite";
import { useState, useEffect } from "react";
import { Button, FormControl, InputGroup, Spinner } from "react-bootstrap";
import { FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import DaySelectorComponent from "../articles/DaySelectorComponent";
import TimeSelectorComponent from "../articles/TimeSelectorComponent";
import ConfirmDeleteMedicineComponent from "./ConfirmDeleteMedicineComponent";

export default function EditMedicineComponent({
	selectedMedicine,
	medication,
	setMedication,
	database,
	userName,
}) {
	const [purpose, setPurpose] = useState("");
	const [dosage, setDosage] = useState("");
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [dayTime, setDayTime] = useState({});
	const [sideEffects, setSideEffects] = useState([]);
	const [extras, setExtras] = useState([]);
	const [isSaving, setSaving] = useState(false);

	useEffect(() => {
		if (selectedMedicine === undefined) return;
		setPurpose(selectedMedicine.purpose);
		setDosage(selectedMedicine.dosage);
		setSideEffects(selectedMedicine.side_effects);
		setExtras(selectedMedicine.extras);
		setDayTime({
			days: selectedMedicine.days,
			time: selectedMedicine.time,
		});
	}, [selectedMedicine]);

	async function save() {
		if (selectedMedicine === undefined) return;
		setSaving(true);
		const newMedicine = new Object(selectedMedicine);
		newMedicine.purpose = purpose;
		newMedicine.dosage = dosage;
		newMedicine.days = dayTime.days;
		newMedicine.time = dayTime.time;
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
			setSaving(false);
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
					{isSaving ? (
						<Spinner animation="border" role="status" />
					) : (
						<FaSave size={30} onClick={save} className="toggle" />
					)}
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
					<FormControl
						value={purpose}
						onChange={(event) => {
							setPurpose(event.target.value);
						}}
					/>
					<br />
					<b style={{ paddingBottom: 5, fontSize: 20 }}>Dosage</b>
					<FormControl
						value={dosage}
						onChange={(event) => {
							setDosage(event.target.value);
						}}
					/>
					<br />
					<b style={{ paddingBottom: 10, fontSize: 20 }}>Day</b>
					<DaySelectorComponent article={dayTime} />
					<br />
					<b style={{ paddingBottom: 10, fontSize: 20 }}>Time</b>
					<TimeSelectorComponent article={dayTime} />
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
					<div className="line" />
					<br />
					<Button
						style={{ width: "fit-content" }}
						variant="danger"
						onClick={() => {
							setShowDeleteModal(true);
						}}
					>
						Delete Medicine
					</Button>
					<br />
					<ConfirmDeleteMedicineComponent
						show={showDeleteModal}
						setShow={setShowDeleteModal}
						database={database}
						userName={userName}
						medicines={medication}
						setMedication={setMedication}
						selectedMedicine={selectedMedicine}
					/>
					<br />
				</div>
			</div>
		);
	} else {
		return null;
	}
}

export function SideEffects({ sideEffects, setSideEffects }) {
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

export function Extras({ extras, setExtras }) {
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

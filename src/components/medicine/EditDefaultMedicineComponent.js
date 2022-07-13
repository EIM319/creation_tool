import { updateDoc } from "firebase/firestore/lite";
import { useState, useEffect } from "react";
import { Button, FormControl, InputGroup, Spinner } from "react-bootstrap";
import { FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import DaySelectorComponent from "../articles/DaySelectorComponent";
import TimeSelectorComponent from "../articles/TimeSelectorComponent";
import ConfirmDeleteDefaultMedicineComponent from "./ConfirmDeleteDefaultMedicine";
import { Extras, SideEffects } from "./EditMedicineComponent";

export default function EditDefaultMedicineComponent({
	selectedMedicine,
	setSelectedMedicine,
	medication,
	setMedication,
}) {
	const [name, setName] = useState("");
	const [purpose, setPurpose] = useState("");
	const [dosage, setDosage] = useState("");
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [dayTime, setDayTime] = useState({});
	const [sideEffects, setSideEffects] = useState([]);
	const [extras, setExtras] = useState([]);
	const [isSaving, setSaving] = useState(false);

	useEffect(() => {
		if (selectedMedicine === undefined) return;
		setName(selectedMedicine.data.name);
		setPurpose(selectedMedicine.data.purpose);
		setDosage(selectedMedicine.data.dosage);
		setSideEffects(selectedMedicine.data.side_effects);
		setExtras(selectedMedicine.data.extras);
		setDayTime({
			days: selectedMedicine.data.days,
			time: selectedMedicine.data.time,
		});
	}, [selectedMedicine]);

	async function save() {
		if (selectedMedicine === undefined) return;
		setSaving(true);
		const ref = selectedMedicine.ref;
		const newMedicine = new Object(selectedMedicine.data);
		newMedicine.name = name;
		newMedicine.purpose = purpose;
		newMedicine.dosage = dosage;
		newMedicine.days = dayTime.days;
		newMedicine.time = dayTime.time;
		newMedicine.side_effects = sideEffects;
		newMedicine.extras = extras;
		updateDoc(ref, newMedicine).then(() => {
			const index = medication.indexOf(selectedMedicine);
			if (index < 0) return;
			const newArticle = new Object(selectedMedicine);
			newArticle.data = newMedicine;
			const newArticles = [...medication];
			newArticles[index] = newArticle;
			setMedication(newArticles);
			setSaving(false);
			toast.success("Medicine Updated");
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
						{selectedMedicine.data.name}
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
					<b style={{ paddingBottom: 10, fontSize: 20 }}>Name</b>
					<FormControl
						value={name}
						onChange={(event) => {
							setName(event.target.value);
						}}
					/>
					<br />
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
					<ConfirmDeleteDefaultMedicineComponent
						show={showDeleteModal}
						setShow={setShowDeleteModal}
						selectedMedicine={selectedMedicine}
						setSelectedMedicine={setSelectedMedicine}
						medication={medication}
						setMedication={setMedication}
					/>
					<br />
				</div>
			</div>
		);
	} else {
		return null;
	}
}

import { collection, doc, getDocs, updateDoc } from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddMedicationModal({
	show,
	setShow,
	database,
	userName,
	medication,
	setMedication,
	setSelected,
}) {
	const [defaultMedication, setDefaultMedication] = useState([]);
	const [selectedMedication, setSelectedMedication] = useState(new Set());
	const [keyword, setKeyword] = useState("");

	useEffect(() => {
		getDefaultMedications(database, setDefaultMedication);
	}, []);

	useEffect(() => {
		selectedMedication.clear();
		if (show) {
			setKeyword("");
		}
	}, [show]);

	return (
		<Modal
			show={show}
			onHide={() => {
				setShow(false);
			}}
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title>Get Medication</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Control
					placeholder="Search"
					value={keyword}
					onChange={(event) => {
						setKeyword(event.target.value);
					}}
					style={{ marginBottom: 20 }}
				/>
				<div style={{ height: "50vh", overflow: "auto" }}>
					<MedicationList
						selectedMedication={selectedMedication}
						setSelectedMedication={setSelectedMedication}
						defaultMedication={defaultMedication}
						keyword={keyword}
					/>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
					}}
				>
					<p style={{ fontSize: 13, margin: 0, paddingRight: 10 }}>
						Unable to find what you need?{" "}
						<Link to="/tool">Click Here</Link>
					</p>
				</div>
				<Button
					onClick={async () => {
						setShow(false);
						const ref = doc(database, "users", userName);
						const newMedications = [...medication];
						var first;
						selectedMedication.forEach((index) => {
							const newMedicine = Object.assign(
								{},
								defaultMedication[index]
							);
							newMedications.push(newMedicine);
							if (first === undefined) {
								first = newMedicine;
							}
						});
						await updateDoc(ref, {
							medication: newMedications,
						}).then(() => {
							setSelected(first);
							setMedication(newMedications);
							toast.success("Import Successful");
						});
					}}
				>
					Add
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

async function getDefaultMedications(database, setDefaultMedication) {
	const items = [];
	const ref = collection(database, "medication");
	const docs = await getDocs(ref);
	docs.docs.forEach((doc) => {
		items.push(doc.data());
	});
	setDefaultMedication(items);
}

function MedicationList({
	selectedMedication,
	setSelectedMedication,
	defaultMedication,
	keyword,
}) {
	const items = [];
	for (let i = 0; i < defaultMedication.length; i++) {
		const medicine = defaultMedication[i];
		if (!medicine.name.toLowerCase().includes(keyword.toLowerCase()))
			continue;
		if (selectedMedication.has(i)) {
			items.push(
				<div
					className="toggle"
					onClick={() => {
						const newSet = new Set(selectedMedication);
						newSet.delete(i);
						setSelectedMedication(newSet);
					}}
				>
					<b style={{ color: "rgb(12, 121, 235)" }}>
						{medicine.name}
					</b>
					<p style={{ color: "rgb(12, 121, 235)" }}>
						{medicine.purpose}
					</p>
				</div>
			);
		} else {
			items.push(
				<div
					className="toggle"
					onClick={() => {
						const newSet = new Set(selectedMedication);
						newSet.add(i);
						setSelectedMedication(newSet);
					}}
				>
					<b>{medicine.name}</b>
					<p>{medicine.purpose}</p>
				</div>
			);
		}
	}
	return items;
}

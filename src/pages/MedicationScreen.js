import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore/lite";
import { Button, Col, Row } from "react-bootstrap";
import EditMedicineComponent from "../components/medicine/EditMedicineComponent";
import LoadingComponent from "../components/LoadingComponent";
import AddMedicationModal from "../components/medicine/AddMedicationModal";

export default function MedicationScreen({ database, userName }) {
	const [medication, setMedication] = useState();
	const [selectedMedicine, setSelectedMedicine] = useState();
	const [openModal, setOpenModal] = useState(false);

	useEffect(() => {
		getMedication(database, userName, setMedication, setSelectedMedicine);
	}, []);

	if (medication === undefined) return <LoadingComponent />;
	const medicationList = [];
	for (let i = 0; i < medication.length; i++) {
		const medicine = medication[i];
		medicationList.push(
			<div
				className="toggle"
				onClick={() => {
					setSelectedMedicine(medicine);
				}}
				key={i}
			>
				<p
					className={
						selectedMedicine === medicine
							? "listItem listItemSelected"
							: "listItem"
					}
				>
					{medicine.name}
				</p>
			</div>
		);
	}

	return (
		<div className="content">
			<Row style={{ width: "100%", margin: 0 }}>
				<Col xs={3} className="listPanel">
					{medicationList}
					<div style={{ margin: 10 }}>
						<Button
							variant="secondary"
							style={{ width: "100%" }}
							onClick={() => {
								setOpenModal(true);
							}}
						>
							Add Medication
						</Button>
					</div>
				</Col>
				<Col xs={9}>
					<EditMedicineComponent
						selectedMedicine={selectedMedicine}
						medication={medication}
						setMedication={setMedication}
						database={database}
						userName={userName}
					/>
				</Col>
			</Row>
			<AddMedicationModal
				show={openModal}
				setShow={setOpenModal}
				database={database}
				userName={userName}
				medication={medication}
				setMedication={setMedication}
				setSelected={setSelectedMedicine}
			/>
		</div>
	);
}

async function getMedication(
	database,
	userName,
	setMedication,
	setSelectedMedicine
) {
	const ref = doc(database, "users", userName);
	const result = await getDoc(ref);
	const data = result.data();
	setMedication(data.medication);
	if (data.medication.length > 0) {
		setSelectedMedicine(data.medication[0]);
	}
}

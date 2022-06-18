import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore/lite";
import { Col, Row } from "react-bootstrap";
import EditMedicineComponent from "../components/medicine/EditMedicineComponent";

export default function MedicationScreen({ database, userName }) {
	const [medication, setMedication] = useState();
	const [selectedMedicine, setSelectedMedicine] = useState(0);

	useEffect(() => {
		getMedication(database, userName, setMedication);
	}, []);

	if (medication === undefined) return <></>;
	const medicationList = [];
	for (let i = 0; i < medication.length; i++) {
		const medicine = medication[i];
		medicationList.push(
			<div
				className="toggle"
				style={{
					width: "100%",
					paddingLeft: 30,
					paddingRight: 30,
				}}
				onClick={() => {
					setSelectedMedicine(medicine);
				}}
				key={i}
			>
				<p>{medicine.name}</p>
			</div>
		);
	}

	return (
		<div className="content">
			<Row style={{ width: "100%" }}>
				<Col xs={3} style={{ padding: 30 }}>
					{medicationList}
				</Col>
				<Col xs={9} style={{ padding: 30 }}>
					<EditMedicineComponent
						selectedMedicine={selectedMedicine}
						medication={medication}
						setMedication={setMedication}
						database={database}
						userName={userName}
					/>
				</Col>
			</Row>
		</div>
	);
}

async function getMedication(database, userName, setMedication) {
	const ref = doc(database, "users", userName);
	const result = await getDoc(ref);
	const data = result.data();
	setMedication(data.medication);
}

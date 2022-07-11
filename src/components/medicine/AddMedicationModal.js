import { collection, doc, getDocs, updateDoc } from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddMedicationModal({
	show,
	setShow,
	database,
	userName,
	medication,
	setMedication,
	setSelectedMedicine,
}) {
	const [defaultMedication, setDefaultMedication] = useState([]);

	useEffect(() => {
		getDefaultMedications(database, setDefaultMedication);
	}, []);

	const itemsListing = [];
	defaultMedication.forEach((medicine) => {
		itemsListing.push(
			<div
				className="toggle"
				onClick={async () => {
					setShow(false);
					const ref = doc(database, "users", userName);
					const newMedicine = Object.assign({}, medicine);
					const newMedications = [...medication, newMedicine];
					await updateDoc(ref, {
						medication: newMedications,
					}).then(() => {
						setMedication(newMedications);
						setSelectedMedicine(newMedicine);
						toast.success("Import Successful");
					});
				}}
			>
				<b>{medicine.name}</b>
				<p>{medicine.purpose}</p>
			</div>
		);
	});

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
			<Modal.Body>{itemsListing}</Modal.Body>
			<Modal.Footer>
				<p>Unable to find what you need?</p>
				<Link to="/tool">Click Here</Link>
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

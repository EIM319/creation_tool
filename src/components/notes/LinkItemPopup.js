import { Modal, Button } from "react-bootstrap";

export default function LinkItemPopup({
	show,
	setShow,
	monitoring,
	medication,
	setAttachedType,
	setAttachedItem,
	additionalNotes,
}) {
	function MonitoringList() {
		var itemList = [];
		monitoring.forEach((article) => {
			itemList.push(
				<p
					className="toggle"
					onClick={() => {
						setAttachedType("monitoring");
						setAttachedItem(article.name);
						additionalNotes.attachedType = "monitoring";
						additionalNotes.attachedItem = article.name;
						setShow(false);
					}}
				>
					{article.name}
				</p>
			);
		});
		return itemList;
	}

	function MedicationList() {
		var itemList = [];
		medication.forEach((article) => {
			itemList.push(
				<p
					className="toggle"
					onClick={() => {
						setAttachedType("medication");
						setAttachedItem(article.name);
						additionalNotes.attachedType = "medication";
						additionalNotes.attachedItem = article.name;
						setShow(false);
					}}
				>
					{article.name}
				</p>
			);
		});
		return itemList;
	}

	return (
		<Modal
			show={show}
			onHide={() => {
				setShow(false);
			}}
			centered
		>
			<Modal.Header>
				<Modal.Title>Link Medication / Patient Education</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<MonitoringList />
				<MedicationList />
			</Modal.Body>
			<Modal.Footer>
				<Button
					onClick={() => {
						setAttachedType(null);
						setAttachedItem(null);
						additionalNotes.attachedType = null;
						additionalNotes.attachedItem = null;
						setShow(false);
					}}
				>
					None
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

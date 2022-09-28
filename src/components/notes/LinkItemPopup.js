import { useState } from "react";
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
	const [isMonitoring, setMonitoring] = useState(true);

	function Selector() {
		if (isMonitoring) {
			return (
				<div style={{ display: "flex", flexDirection: "row" }}>
					<p
						style={{
							padding: "10px 20px",
							background: "var(--accent)",
							color: "white",
							borderRadius: 10,
						}}
					>
						Patient Education
					</p>
					<p
						className="toggle"
						style={{ padding: "10px 20px" }}
						onClick={() => {
							setMonitoring(false);
						}}
					>
						Medication
					</p>
				</div>
			);
		}
		return (
			<div style={{ display: "flex", flexDirection: "row" }}>
				<p
					className="toggle"
					style={{ padding: "10px 20px" }}
					onClick={() => {
						setMonitoring(true);
					}}
				>
					Patient Education
				</p>
				<p
					style={{
						padding: "10px 20px",
						background: "var(--accent)",
						color: "white",
						borderRadius: 10,
					}}
				>
					Medication
				</p>
			</div>
		);
	}

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
					• {article.name}
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
					• {article.name}
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
			<Modal.Body style={{ height: "50vh" }}>
				<Selector />
				<div style={{ padding: 10, overflowY: "auto" }}>
					{isMonitoring ? <MonitoringList /> : <MedicationList />}
				</div>
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

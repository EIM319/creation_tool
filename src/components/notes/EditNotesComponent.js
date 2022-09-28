import { Row, Col, FormControl, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import LinkItemPopup from "./LinkItemPopup";

export default function EditNotesComponent({
	additional_notes,
	note,
	setNote,
	index,
	medication,
	monitoring,
}) {
	const [title, setTitle] = useState("");
	const [value, setValue] = useState("");
	const [attachedType, setAttachedType] = useState();
	const [attachedItem, setAttachedItem] = useState();
	const [showPopup, setShowPopup] = useState(false);

	useEffect(() => {
		if (additional_notes === undefined) return;
		setTitle(additional_notes.title);
		setValue(additional_notes.value);
		setAttachedType(additional_notes.attachedType);
		setAttachedItem(additional_notes.attachedItem);
	}, [additional_notes]);

	function deleteNote() {
		const newNote = [...note];
		newNote.splice(index, 1);
		setNote(newNote);
	}

	return (
		<Row style={{ marginBottom: 10, marginLeft: 0, marginRight: 0 }}>
			<Col xs={2} style={{ padding: 5 }}>
				<FormControl
					value={title}
					onChange={(event) => {
						additional_notes.title = event.target.value;
						setTitle(event.target.value);
					}}
				></FormControl>
			</Col>
			<Col xs={6} style={{ padding: 5 }}>
				<FormControl
					as="textarea"
					value={value}
					onChange={(event) => {
						additional_notes.value = event.target.value;
						setValue(event.target.value);
					}}
				></FormControl>
			</Col>
			<Col
				xs={3}
				style={{
					height: 50,
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
				}}
			>
				<Button
					style={{ margin: 0, textOverflow: "ellipsis" }}
					variant="outline-secondary"
					onClick={() => {
						setShowPopup(true);
					}}
				>
					{attachedType === undefined || attachedType === null
						? "No Item linked"
						: attachedItem}
				</Button>
			</Col>
			<Col xs={1} style={{ padding: 5 }}>
				<Button variant="danger" onClick={deleteNote}>
					X
				</Button>
			</Col>
			<LinkItemPopup
				show={showPopup}
				setShow={setShowPopup}
				monitoring={monitoring}
				medication={medication}
				setAttachedType={setAttachedType}
				setAttachedItem={setAttachedItem}
				additionalNotes={additional_notes}
			/>
		</Row>
	);
}

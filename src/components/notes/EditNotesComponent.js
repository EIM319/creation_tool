import { Row, Col, FormControl, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function EditNotesComponent({
	additional_notes,
	note,
	setNote,
	index,
	setUnsaved
}) {
	const [title, setTitle] = useState("");
	const [value, setValue] = useState("");

	useEffect(() => {
		if (additional_notes === undefined) return;
		setTitle(additional_notes.title);
		setValue(additional_notes.value);
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
						setUnsaved(true);
						additional_notes.title = event.target.value;
						setTitle(event.target.value);
					}}
				></FormControl>
			</Col>
			<Col xs={9} style={{ padding: 5 }}>
				<FormControl
					as="textarea"
					value={value}
					onChange={(event) => {
						setUnsaved(true);
						additional_notes.value = event.target.value;
						setValue(event.target.value);
					}}
				></FormControl>
			</Col>
			<Col xs={1} style={{ padding: 5 }}>
				<Button variant="danger" onClick={deleteNote}>
					X
				</Button>
			</Col>
		</Row>
	);
}

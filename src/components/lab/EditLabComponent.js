import { Row, Col, FormControl, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function EditLabComponent({ labResult, lab, setLab, index, setUnsaved }) {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [solution, setSolution] = useState("");

	useEffect(() => {
		if (labResult === undefined) return;
		setTitle(labResult.title);
		setContent(labResult.content);
		setSolution(labResult.solution);
	}, [labResult]);

	function deleteLab() {
		const newLab = [...lab];
		newLab.splice(index, 1);
		setLab(newLab);
	}

	return (
		<Row style={{ marginBottom: 10, marginLeft: 0, marginRight: 0 }}>
			<Col xs={2} style={{ padding: 5 }}>
				<FormControl
					value={title}
					onChange={(event) => {
						setUnsaved(true);
						labResult.title = event.target.value;
						setTitle(event.target.value);
					}}
				></FormControl>
			</Col>
			<Col xs={4} style={{ padding: 5 }}>
				<FormControl
					as="textarea"
					value={content}
					onChange={(event) => {
						labResult.content = event.target.value;
						setContent(event.target.value);
					}}
				></FormControl>
			</Col>
			<Col xs={4} style={{ padding: 5 }}>
				<FormControl
					as="textarea"
					value={solution}
					onChange={(event) => {
						labResult.solution = event.target.value;
						setSolution(event.target.value);
					}}
				></FormControl>
			</Col>
			<Col xs={1} style={{ padding: 5 }}>
				<Button variant="danger" onClick={deleteLab}>
					X
				</Button>
			</Col>
		</Row>
	);
}

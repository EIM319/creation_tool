import { useState, useEffect } from "react";
import { updateDoc, doc, getDoc } from "firebase/firestore/lite";
import { Col, Row, Button } from "react-bootstrap";
import EditNotesComponent from "../components/notes/EditNotesComponent";
import LoadingComponent from "../components/LoadingComponent";
import { FaSave } from "react-icons/fa";

export default function AdditionalNotesScreen({ database, userName }) {
	const [note, setNote] = useState();

	useEffect(() => {
		getNote(database, userName, setNote);
	}, []);

	if (note === undefined) return <LoadingComponent />;
	const noteList = [];

	for (let i = 0; i < note.length; i++) {
		noteList.push(
			<EditNotesComponent
				additional_notes={note[i]}
				note={note}
				setNote={setNote}
				index={i}
			></EditNotesComponent>
		);
	}

	function addNote() {
		setNote([...note, { title: "", value: "" }]);
	}

	async function save() {
		const ref = doc(database, "users", userName);
		await updateDoc(ref, {
			additional_notes: note,
		});
	}

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
				<p style={{ fontSize: 30, margin: 0 }}>Care Staff's Comments</p>
				<FaSave size={30} onClick={save} className="toggle" />
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					overflowY: "auto",
					padding: "0px 30px 0px 30px",
				}}
			>
				<Row
					style={{ marginBottom: 10, marginLeft: 0, marginRight: 0 }}
				>
					<Col xs={2} style={{ padding: 5 }}>
						<b>Title</b>
					</Col>
					<Col xs={9} style={{ padding: 5 }}>
						<b>Content</b>
					</Col>
				</Row>
				{noteList}
				<Button
					style={{ width: "fit-content" }}
					variant="secondary"
					onClick={addNote}
				>
					Add Row
				</Button>
			</div>
		</div>
	);
}

async function getNote(database, userName, setNote) {
	const ref = doc(database, "users", userName);
	const result = await getDoc(ref);
	const data = result.data();
	setNote(data.additional_notes);
	console.log(data.additional_notes);
}

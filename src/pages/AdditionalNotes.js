import { useState, useEffect } from "react";
import { updateDoc, doc, getDoc } from "firebase/firestore/lite";
import { Col, Row, Button } from "react-bootstrap";
import EditNotesComponent from "../components/notes/EditNotesComponent";

export default function AdditionalNotes({database, userName}) {
	const [note, setNote] = useState(); 
	const [selectedNote, setSelectedNote] = useState();
	
	const [title] = useState([]);
	const [value] = useState([]);

  useEffect(() =>{
    getNote(database, userName, setNote);
  }, []);

	if (note === undefined) return <></>;
	const noteList = []; 

	for (let i=0; i<note.length; i++){
		noteList.push(
			<EditNotesComponent additional_notes= {note[i]} note = {note} setNote = {setNote} index = {i}>
			</EditNotesComponent>
		)
	}

	function addNote(){
		setNote([...note,{title: "",value: ""}])
	}

	async function save(){
		const ref = doc(database, "users", userName);
		await updateDoc(ref, {
			additional_notes: note
		});
	}

  return (
    <div className="value">
		<Row>
			<Col>
			<b>Keep/Remove</b>
			</Col>
			<Col>
			<b>Section</b>
			</Col>
			<Col>
			<b>Explanation</b>
			</Col>
		</Row>
			{noteList}
		<Button onClick={addNote}>Add</Button>
		<Button onClick={save}>Save</Button>
		</div>
  )
}


async function getNote(database, userName, setNote) {
	const ref = doc(database, "users", userName);
	const result = await getDoc(ref);
	const data = result.data();
	setNote(data.additional_notes);
	console.log(data.additional_notes);
}


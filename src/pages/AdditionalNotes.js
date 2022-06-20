import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore/lite";
import { Col, Row } from "react-bootstrap";
import EditNotesComponent from "../components/notes/EditNotesComponent";

export default function AdditionalNotes({database, userName}) {
	const [note, setNote] = useState(); 
  const [selectedNote, setSelectedNote] = useState();

  useEffect(() =>{
    getNote(database, userName, setNote);
  }, []);

  if (note === undefined) return <></>;
  const noteList = []; 
  for (let i=0; i<note.length; i++){
    const explanation = note[i];
    noteList.push(
      <div
				className="toggle"
				style={{
					width: "100%",
					paddingLeft: 30,
					paddingRight: 30,
				}}
				onClick={() => {
					setSelectedNote(explanation);
				}}
				key={i}
			>
        <p>{explanation.title}</p>
      </div>
    );
  }

  return (
    <div className="content">
			<Row style={{ width: "100%" }}>
				<Col xs={3} style={{ padding: 30 }}>
					{noteList}
				</Col>
				<Col xs={9} style={{ padding: 30 }}>
					<EditNotesComponent
						selectedNote={selectedNote}
						note={note}
						setNote={setNote}
						database={database}
						userName={userName}
					/>
				</Col>
			</Row>
		</div>
  )
}


async function getNote(database, userName, setNote) {
	const ref = doc(database, "users", userName);
	const result = await getDoc(ref);
	const data = result.data();
	setNote(data.notes);
}


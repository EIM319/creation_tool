import { doc, updateDoc } from "firebase/firestore/lite";
import { useState, useEffect } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";

export default function EditNotesComponent({
    selectedNote,
    note, 
    setNote, 
    database, 
    userName,

}) {
    const [content, setContent] = useState([]); 
    const [solution, setSolution] = useState([]);

    useEffect(() => {
        if (selectedNote === undefined) return;
        setContent(selectedNote.content);
        setSolution(selectedNote.solution);
    }, [selectedNote]); 

    async function save(){
        if (selectedNote === undefined) return;
        const newNote = new Object(selectedNote); 
        newNote.content = content; 
        newNote.solution = solution; 

        const newNoteList = [...note]; 
        newNoteList.forEach((explanation) =>{
            if(explanation.title === newNote){
                explanation = newNote;
            }
        });
        const ref = doc(database, "users", userName);
        await updateDoc(ref, {
            note: newNoteList, 
        }).then(() =>{
            setNote(newNoteList);
        })
    }

    if (selectedNote !== undefined){
        return (
            <div style={{ display: "flex", flexDirection: "column" }}>
				<b>Title</b>
				<p>{selectedNote.title}</p>
				<b>Explanation</b>
				<InputGroup>
					<FormControl
						value={content}
						onChange={(event) => {
							setContent(event.target.value);
						}}
					/>
				</InputGroup>
				<Button onClick={save}>Save</Button>
			</div>
		);
    } else{
        return null;
    }
}
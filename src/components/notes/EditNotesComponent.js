import {Row, Col, FormControl, Button} from "react-bootstrap";
import {useState, useEffect} from "react";

export default function EditNotesComponent(
    {note_check, note, setNote, index})
{
    const [title, setTitle] = useState(""); 
    const [value, setValue] = useState("");

    useEffect(()=> {
        if (note_check === undefined) return;
		setTitle(note_check.title);
		setValue(note_check.value);
    }, [note_check])

    function deleteNote(){
            const newNote = [...note];
            newNote.splice(index, 1);
            setNote(newNote);
        }

    return (
        <Row >
            <Col>
                <Button onClick = {deleteNote}> 
                    X
                </Button>
            </Col>
            <Col>
                <FormControl 
                    value = {title}
                    onChange = {event => 
                        {note_check.title = event.target.value
                        setTitle(event.target.value)}
                    }
                >
                </FormControl>
            </Col>
        
            <Col>
                <FormControl 
                    value = {value}
                    onChange = {event => 
                        {note_check.value = event.target.value
                        setValue(event.target.value)}
                    }
                >
                </FormControl>
            </Col>

        </Row>
     );
 
}
   

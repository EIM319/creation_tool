import { doc, updateDoc } from "firebase/firestore/lite";
import { useState, useEffect } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";

export default function EditAnalysisComponent({
    selectedLab,
    setSelectedLab,
    lab, 
    setLab, 
    database, 
    userName,

}) {
    const [content, setContent] = useState([]); 
    const [solution, setSolution] = useState([]);

    useEffect(() => {
        if (selectedLab === undefined) return;
        setContent(selectedLab.content);
        setSolution(selectedLab.solution);
    }, [selectedLab]); 

    async function save(){
        if (selectedLab === undefined) return;
        const newLab = new Object(selectedLab); 
        newLab.content = content; 
        newLab.solution = solution; 

        const newLabList = [...lab]; 
        newLabList.forEach((analysis) =>{
            if(analysis.title === newLab){
                analysis = newLab;
            }
        });
        const ref = doc(database, "users", userName);
        await updateDoc(ref, {
            lab: newLabList, 
        }).then(() =>{
            setLab(newLabList);
        })
    }

    if (selectedLab !== undefined){
        return (
            <div style={{ display: "flex", flexDirection: "column" }}>
				<b>Title</b>
				<p>{selectedLab.title}</p>
				<b>Analysis</b>
				<InputGroup>
					<FormControl
						value={content}
						onChange={(event) => {
							setContent(event.target.value);
						}}
					/>
				</InputGroup>
                <b>Recommendation</b>
				<InputGroup>
					<FormControl
						value={solution}
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
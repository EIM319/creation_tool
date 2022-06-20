import { useState, useEffect } from "react";
import { updateDoc, doc, getDoc } from "firebase/firestore/lite";
import { Col, Row, Button } from "react-bootstrap";
import EditLabComponent from "../components/lab/EditLabComponent";

export default function LabResultsScreen({database, userName}) {
	const [lab, setLab] = useState(); 
	const [selectedLab, setSelectedLab] = useState();
	
	const [content] = useState([]); 
	const [solution] = useState([]);

  useEffect(() =>{
    getLab(database, userName, setLab);
  }, []);

	if (lab === undefined) return <></>;
	const labList = []; 

	for (let i=0; i<lab.length; i++){
		labList.push(
			<EditLabComponent labResult = {lab[i]} lab = {lab} setLab = {setLab} index = {i}>
			</EditLabComponent>
		)
	}

	function addLab(){
		setLab([...lab,{title: "",content: "",solution: ""}])
	}

	async function save(){
		const ref = doc(database, "users", userName);
		await updateDoc(ref, {
			lab_result: lab
		});
	}

  return (
    <div className="content">
		<Row>
			<Col>
			<b>Result Profile</b>
			</Col>
			<Col>
			<b>Result Explanation</b>
			</Col>
			<Col>
			<b>Changes Based on Result</b>
			</Col>
		</Row>
			{labList}
		<Button onClick={addLab}>Add</Button>
		<Button onClick={save}>Save</Button>
		</div>
  )
}


async function getLab(database, userName, setLab) {
	const ref = doc(database, "users", userName);
	const result = await getDoc(ref);
	const data = result.data();
	setLab(data.lab_result);
}


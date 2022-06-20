import { useState, useEffect } from "react";
import { updateDoc, doc, getDoc } from "firebase/firestore/lite";
import { Col, Row, Button } from "react-bootstrap";
import EditAnalysisComponent from "../components/lab/EditAnalysisComponent";
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
    const analysis = lab[i];
    labList.push(
      <div
				className="toggle"
				style={{
					width: "100%",
					paddingLeft: 30,
					paddingRight: 30,
				}}
				onClick={() => {
					setSelectedLab(analysis);
				}}
				key={i}
			>
        <p>{analysis.title}</p>
      </div>
    );
  }

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

  return (
    <div className="content">
			<Row style={{ width: "100%" }}>
				<Col xs={3} style={{ padding: 30 }}>
					{labList}
				</Col>
				<Col xs={9} style={{ padding: 30 }}>
					<EditAnalysisComponent
						selectedLab= {
							<EditLabComponent 
							selectedLab = {selectedLab} 
							setSelectedLab = {setSelectedLab}
							/>
						}
						setSelectedLab = {setSelectedLab}
						lab={lab}
						setLab={setLab}
						database={database}
						userName={userName}
					/>
				</Col>
			</Row>
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


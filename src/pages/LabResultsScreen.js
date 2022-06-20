import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore/lite";
import { Col, Row } from "react-bootstrap";
import EditLabComponent from "../components/lab/EditLabComponent";

export default function LabResultsScreen({database, userName}) {
	const [lab, setLab] = useState(); 
  const [selectedLab, setSelectedLab] = useState();

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

  return (
    <div className="content">
			<Row style={{ width: "100%" }}>
				<Col xs={3} style={{ padding: 30 }}>
					{labList}
				</Col>
				<Col xs={9} style={{ padding: 30 }}>
					<EditLabComponent
						selectedLab={selectedLab}
						lab={lab}
						setLab={setLab}
						database={database}
						userName={userName}
					/>
				</Col>
			</Row>
		</div>
  )
}


async function getLab(database, userName, setLab) {
	const ref = doc(database, "users", userName);
	const result = await getDoc(ref);
	const data = result.data();
	setLab(data.lab_result);
}


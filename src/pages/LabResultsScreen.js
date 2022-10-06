import { useState, useEffect } from "react";
import { updateDoc, doc, getDoc } from "firebase/firestore/lite";
import { Col, Row, Button, Spinner } from "react-bootstrap";
import EditLabComponent from "../components/lab/EditLabComponent";
import LoadingComponent from "../components/LoadingComponent";
import { FaSave } from "react-icons/fa";
import { toast } from "react-toastify";

export default function LabResultsScreen({ database, userName }) {
	const [lab, setLab] = useState();
	const [isSaving, setSaving] = useState(false);

	useEffect(() => {
		getLab(database, userName, setLab);
	}, []);

	if (lab === undefined) return <LoadingComponent />;
	const labList = [];

	for (let i = 0; i < lab.length; i++) {
		labList.push(
			<EditLabComponent
				labResult={lab[i]}
				lab={lab}
				setLab={setLab}
				index={i}
			/>
		);
	}

	function addLab() {
		setLab([...lab, { title: "", content: "", solution: "" }]);
	}

	async function save() {
		setSaving(true);
		const ref = doc(database, "users", userName);
		await updateDoc(ref, {
			lab_result: lab,
		}).then(() => {
			setSaving(false);
			toast.success("Save Successful");
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
				<p style={{ fontSize: 30, margin: 0 }}>Lab Results Analysis</p>
				{isSaving ? (
					<Spinner animation="border" role="status" />
				) : (
					<FaSave size={30} onClick={save} className="toggle" />
				)}
			</div>
			<div> 
				<p style={{ fontSize: 15, marginLeft: 35, marginBottom: 0 }}> Note: Patients will be able to view their full lab results via Health Hub </p>
				<p style={{ fontSize: 15, marginLeft: 35, marginTop: 0 }}> The below section is only for extra notes from the lab result to highlight to the patients  </p>
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
						<b>Result Profile</b>
					</Col>
					<Col xs={4} style={{ padding: 5 }}>
						<b>Result Explanation</b>
					</Col>
					<Col xs={4} style={{ padding: 5 }}>
						<b>Changes Based on Result</b>
					</Col>
				</Row>
				{labList}
				<br />
				<Button
					style={{ width: "fit-content" }}
					variant="secondary"
					onClick={addLab}
				>
					Add Row
				</Button>
				<br />
			</div>
		</div>
	);
}

async function getLab(database, userName, setLab) {
	const ref = doc(database, "users", userName);
	const result = await getDoc(ref);
	const data = result.data();
	setLab(data.lab_result);
}

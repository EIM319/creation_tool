import { addDoc, collection, getDocs } from "firebase/firestore/lite";
import { useState, useEffect } from "react";
import { Col, Row, Button, Form } from "react-bootstrap";
import EditDefaultArticleComponent from "../components/articles/EditDefaultArticleComponent";
import { toast } from "react-toastify";
import LoadingComponent from "../components/LoadingComponent";
import EditDefaultMedicineComponent from "../components/medicine/EditDefaultMedicineComponent";

export default function DefaultArticleScreen({ database, storage }) {
	const [monitoring, setMonitoring] = useState();
	const [medication, setMedication] = useState();
	const [viewingScreen, setViewingScreen] = useState(0);
	const [selectedArticle, setSelectedArticle] = useState();
	const [keyword, setKeyword] = useState("");

	useEffect(() => {
		getMonitoring(database, setMonitoring, setSelectedArticle);
		getMedication(database, setMedication);
	}, []);

	if (monitoring === undefined) return <LoadingComponent />;

	const listComponents = [];
	if (viewingScreen === 0) {
		if (monitoring !== undefined) {
			monitoring.forEach((article) => {
				if (
					article.data.name
						.toLowerCase()
						.includes(keyword.toLowerCase()) ||
					article.data.tag
						.toLowerCase()
						.includes(keyword.toLowerCase())
				) {
					listComponents.push(
						<div
							className="toggle"
							onClick={() => {
								setSelectedArticle(article);
							}}
						>
							<p
								className={
									selectedArticle === article
										? "listItem listItemSelected green"
										: "listItem"
								}
							>
								{article.data.name}
							</p>
						</div>
					);
				}
			});
		}
	} else {
		if (medication !== undefined) {
			medication.forEach((article) => {
				if (
					article.data.name
						.toLowerCase()
						.includes(keyword.toLowerCase()) ||
					article.data.tag
						.toLowerCase()
						.includes(keyword.toLowerCase())
				) {
					listComponents.push(
						<div
							className="toggle"
							onClick={() => {
								setSelectedArticle(article);
							}}
						>
							<p
								className={
									selectedArticle === article
										? "listItem listItemSelected green"
										: "listItem"
								}
							>
								{article.data.name}
							</p>
						</div>
					);
				}
			});
		}
	}

	async function addArticle() {
		if (viewingScreen === 0) {
			const ref = await addDoc(
				collection(database, "homemonitoring"),
				defaultMonitoring
			);
			const newArticle = {
				ref: ref,
				data: Object.assign({}, defaultMonitoring),
			};
			setSelectedArticle(newArticle);
			setMonitoring([...monitoring, newArticle]);
			toast.success("Added New Article");
		} else {
			const ref = await addDoc(
				collection(database, "medication"),
				defaultMedication
			);
			const newArticle = {
				ref: ref,
				data: Object.assign({}, defaultMedication),
			};
			setSelectedArticle(newArticle);
			setMedication([...medication, newArticle]);
			toast.success("Added New Medication");
		}
	}

	async function addPdf() {
		const ref = await addDoc(
			collection(database, "homemonitoring"),
			defaultMonitoringPdf
		);
		const newArticle = {
			ref: ref,
			data: Object.assign({}, defaultMonitoringPdf),
		};
		setSelectedArticle(newArticle);
		setMonitoring([...monitoring, newArticle]);
		toast.success("Added New Article");
	}

	return (
		<div>
			<Row style={{ width: "100%", margin: 0 }}>
				<Col xs={2}>
					<div
						style={{
							margin: 20,
						}}
					>
						<Col>
							<p
								style={{
									fontWeight: 700,
									fontSize: 30,
								}}
							>
								Admin Tool
							</p>
							<p
								style={{
									fontSize: 17,
									marginBottom: 50,
								}}
							>
								Use this tool to add or edit articles the
								library
							</p>
							<Row
								className={
									viewingScreen === 0
										? "toggle tabSelected green"
										: "toggle tabUnselected"
								}
								onClick={() => {
									setViewingScreen(0);
									setSelectedArticle(monitoring[0]);
								}}
							>
								Patient Education
							</Row>
							<Row
								className={
									viewingScreen === 1
										? "toggle tabSelected green"
										: "toggle tabUnselected"
								}
								onClick={() => {
									setViewingScreen(1);
									setSelectedArticle(medication[0]);
								}}
							>
								Medication
							</Row>
						</Col>
					</div>
				</Col>
				<Col xs={3} className="listPanel">
					<div style={{ padding: 10 }}>
						<Form.Control
							placeholder="Search"
							value={keyword}
							onChange={(event) => {
								setKeyword(event.target.value);
							}}
						/>
					</div>
					<div
						style={{
							overflowY: "auto",
							height: "80vh",
						}}
					>
						{listComponents}
					</div>
					<Row style={{ margin: 0, marginTop: 20 }}>
						<Col>
							<Button
								variant="secondary"
								onClick={addArticle}
								style={{ width: "100%" }}
							>
								Add New
							</Button>
						</Col>
						{viewingScreen === 0 ? (
							<Col>
								<Button
									variant="danger"
									onClick={addPdf}
									style={{ width: "100%" }}
								>
									Add New PDF
								</Button>
							</Col>
						) : null}
					</Row>
				</Col>
				<Col xs={7}>
					{viewingScreen === 0 ? (
						<EditDefaultArticleComponent
							articles={monitoring}
							setArticles={setMonitoring}
							article={selectedArticle}
							setArticle={setSelectedArticle}
							storage={storage}
						/>
					) : (
						<EditDefaultMedicineComponent
							setSelectedMedicine={setSelectedArticle}
							selectedMedicine={selectedArticle}
							medication={medication}
							setMedication={setMedication}
						/>
					)}
				</Col>
			</Row>
		</div>
	);
}

async function getMonitoring(database, setMonitoring, setSelectedArticle) {
	const array = [];
	const ref = collection(database, "homemonitoring");
	const documents = await getDocs(ref);
	documents.forEach((doc) => {
		array.push({ data: doc.data(), ref: doc.ref });
	});
	setMonitoring(array);
	if (array.length > 0) {
		setSelectedArticle(array[0]);
	}
}

async function getMedication(database, setMedication) {
	const array = [];
	const ref = collection(database, "medication");
	const documents = await getDocs(ref);
	documents.forEach((doc) => {
		array.push({ data: doc.data(), ref: doc.ref });
	});
	setMedication(array);
}

const defaultMonitoring = {
	content: [],
	image: "",
	name: "",
	purpose: "",
	isMonitoring: false,
	tag: "",
	time: [false, false, false, false, false, false, false],
	days: [false, false, false, false, false, false, false],
};
const defaultMonitoringPdf = {
	content: [],
	image: "",
	name: "",
	purpose: "",
	isMonitoring: false,
	pdf: "",
	tag: "",
	time: [false, false, false, false, false, false, false],
	days: [false, false, false, false, false, false, false],
};
const defaultMedication = {
	name: "",
	purpose: "",
	dosage: "",
	tag: "",
	time: [false, false, false, false, false, false, false],
	days: [false, false, false, false, false, false, false],
	side_effects: [],
	extras: [],
};

import { addDoc, collection, getDocs } from "firebase/firestore/lite";
import { useState, useEffect } from "react";
import { Col, Row, Button } from "react-bootstrap";
import EditDefaultArticleComponent from "../components/articles/EditDefaultArticleComponent";
import { toast } from "react-toastify";
import LoadingComponent from "../components/LoadingComponent";
import EditDefaultMedicineComponent from "../components/medicine/EditDefaultMedicineComponent";

export default function DefaultArticleScreen({ database }) {
	const [monitoring, setMonitoring] = useState();
	const [medication, setMedication] = useState();
	const [viewingScreen, setViewingScreen] = useState(0);
	const [selectedArticle, setSelectedArticle] = useState();

	useEffect(() => {
		getMonitoring(database, setMonitoring, setSelectedArticle);
		getMedication(database, setMedication);
	}, []);

	if (monitoring === undefined) return <LoadingComponent />;

	const listComponents = [];
	if (viewingScreen === 0) {
		if (monitoring !== undefined) {
			monitoring.forEach((article) => {
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
			});
		}
	} else {
		if (medication !== undefined) {
			medication.forEach((article) => {
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
								Home Monitoring
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
					{listComponents}
					<div style={{ margin: 10 }}>
						<Button
							variant="secondary"
							style={{ width: "100%" }}
							onClick={addArticle}
						>
							Add Article
						</Button>
					</div>
				</Col>
				<Col xs={7}>
					{viewingScreen === 0 ? (
						<EditDefaultArticleComponent
							articles={monitoring}
							setArticles={setMonitoring}
							article={selectedArticle}
							setArticle={setSelectedArticle}
							type="monitoring"
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
	time: [false, false, false, false, false, false, false],
	days: [false, false, false, false, false, false, false],
};
const defaultMedication = {
	name: "",
	purpose: "",
	dosage: "",
	time: [false, false, false, false, false, false, false],
	days: [false, false, false, false, false, false, false],
	side_effects: [],
	extras: [],
};

import { addDoc, collection, getDocs } from "firebase/firestore/lite";
import { useState, useEffect } from "react";
import { Col, Row, Button } from "react-bootstrap";
import EditDefaultArticleComponent from "../components/articles/EditDefaultArticleComponent";
import { toast } from "react-toastify";
import LoadingComponent from "../components/LoadingComponent";

export default function DefaultArticleScreen({ database }) {
	const [monitoring, setMonitoring] = useState();
	const [caregiving, setCaregiving] = useState();
	const [viewingMonitoring, setViewingMonitoring] = useState(true);
	const [selectedArticle, setSelectedArticle] = useState();

	useEffect(() => {
		getMonitoring(database, setMonitoring, setSelectedArticle);
		getCaregiving(database, setCaregiving);
	}, []);

	if (monitoring === undefined) return <LoadingComponent />;

	const listComponents = [];
	if (viewingMonitoring) {
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
									? "listItem listItemSelected"
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
		if (caregiving !== undefined) {
			caregiving.forEach((article) => {
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
									? "listItem listItemSelected"
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
		if (viewingMonitoring) {
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
				collection(database, "caregiving"),
				defaultCaregiving
			);
			const newArticle = {
				ref: ref,
				data: Object.assign({}, defaultCaregiving),
			};
			setSelectedArticle(newArticle);
			setCaregiving([...caregiving, newArticle]);
			toast.success("Added New Article");
		}
	}

	return (
		<div>
			<Row style={{ width: "100%", margin: 0 }}>
				<Col xs={3} className="listPanel">
					<div style={{ margin: 20 }}>
						<Row>
							<Col
								className={
									viewingMonitoring
										? "toggle tabSelected"
										: "toggle tabUnselected"
								}
								onClick={() => {
									setViewingMonitoring(true);
									setSelectedArticle(monitoring[0]);
								}}
							>
								Home Monitoring
							</Col>
							<Col
								className={
									viewingMonitoring
										? "toggle tabUnselected"
										: "toggle tabSelected"
								}
								onClick={() => {
									setViewingMonitoring(false);
									setSelectedArticle(caregiving[0]);
								}}
							>
								Caregiving
							</Col>
						</Row>
					</div>
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
				<Col xs={9}>
					{viewingMonitoring ? (
						<EditDefaultArticleComponent
							articles={monitoring}
							setArticles={setMonitoring}
							article={selectedArticle}
							setArticle={setSelectedArticle}
							type="monitoring"
						/>
					) : (
						<EditDefaultArticleComponent
							articles={caregiving}
							setArticles={setCaregiving}
							article={selectedArticle}
							setArticle={setSelectedArticle}
							type="caregiving"
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

async function getCaregiving(database, setCaregiving) {
	const array = [];
	const ref = collection(database, "caregiving");
	const documents = await getDocs(ref);
	documents.forEach((doc) => {
		array.push({ data: doc.data(), ref: doc.ref });
	});
	setCaregiving(array);
}

const defaultMonitoring = {
	content: [],
	image: "",
	name: "",
	purpose: "",
	time: [false, false, false, false, false, false, false],
	days: [false, false, false, false, false, false, false],
};
const defaultCaregiving = {
	content: [],
	image: "",
	name: "",
	purpose: "",
};

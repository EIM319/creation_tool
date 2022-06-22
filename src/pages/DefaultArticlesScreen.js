import { collection, getDocs } from "firebase/firestore/lite";
import { useState, useEffect } from "react";
import { Col, Row, Button } from "react-bootstrap";
import EditDefaultArticleComponent from "../components/articles/EditDefaultArticleComponent";

export default function DefaultArticleScreen({ database }) {
	const [monitoring, setMonitoring] = useState();
	const [caregiving, setCaregiving] = useState();
	const [viewingMonitoring, setViewingMonitoring] = useState(true);
	const [selectedArticle, setSelectedArticle] = useState();

	useEffect(() => {
		getMonitoring(database, setMonitoring);
		getCaregiving(database, setCaregiving);
	}, []);

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
							onClick={() => {}}
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

async function getMonitoring(database, setMonitoring) {
	const array = [];
	const ref = collection(database, "homemonitoring");
	const documents = await getDocs(ref);
	documents.forEach((doc) => {
		array.push({ data: doc.data(), ref: doc.ref });
	});
	setMonitoring(array);
}

async function getCaregiving(database, setCaregiving) {
	const array = [];
	const ref = collection(database, "caregiving");
	const documents = await getDocs(ref);
	documents.forEach((doc) => {
		array.push({ data: doc.data(), ref: doc.ref });
	});
	console.log(array);
	setCaregiving(array);
}

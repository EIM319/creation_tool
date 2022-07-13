import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore/lite";
import { Button, Col, Row } from "react-bootstrap";
import EditArticleComponent from "../components/articles/EditArticleComponent";
import ImportArticleComponent from "../components/articles/ImportArticleComponent";
import LoadingComponent from "../components/LoadingComponent";

export default function HomeMonitoringScreen({ database, userName, setUnsaved }) {
	const [monitoring, setMonitoring] = useState();
	const [selectedMonitoring, setSelectedMonitoring] = useState();
	const [openModal, setOpenModal] = useState(false);

	useEffect(() => {
		getMonitoring(database, userName, setMonitoring, setSelectedMonitoring);
	}, []);

	if (monitoring === undefined) return <LoadingComponent />;
	const homeMonitoringList = [];
	for (let i = 0; i < monitoring.length; i++) {
		const article = monitoring[i];
		homeMonitoringList.push(
			<div
				className="toggle"
				onClick={() => {
					setSelectedMonitoring(article);
				}}
				key={i}
			>
				<p
					className={
						selectedMonitoring === article
							? "listItem listItemSelected"
							: "listItem"
					}
				>
					{article.name}
				</p>
			</div>
		);
	}

	return (
		<div>
			<Row style={{ width: "100%", margin: 0 }}>
				<Col xs={3} className="listPanel">
					{homeMonitoringList}
					<div style={{ margin: 10 }}>
						<Button
							variant="secondary"
							style={{ width: "100%" }}
							onClick={() => {
								setOpenModal(true);
							}}
						>
							Add Article
						</Button>
					</div>
				</Col>
				<Col xs={9}>
					<EditArticleComponent
						articles={monitoring}
						setArticles={setMonitoring}
						article={selectedMonitoring}
						setArticle={setSelectedMonitoring}
						database={database}
						userName={userName}
						type="monitoring"
						setUnsaved = {setUnsaved}
					/>
				</Col>
			</Row>
			<ImportArticleComponent
				type="monitoring"
				open={openModal}
				setOpen={setOpenModal}
				database={database}
				userName={userName}
				articles={monitoring}
				setArticles={setMonitoring}
				setArticle={setSelectedMonitoring}
			/>
		</div>
	);
}

async function getMonitoring(
	database,
	userName,
	setMonitoring,
	setSelectedMonitoring
) {
	const ref = doc(database, "users", userName);
	const result = await getDoc(ref);
	const data = result.data();
	setMonitoring(data.monitoring);
	if (data.monitoring.length > 0) {
		setSelectedMonitoring(data.monitoring[0]);
	}
}

import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { doc, getDoc } from "firebase/firestore/lite";
import EditArticleComponent from "../components/articles/EditArticleComponent";
import ImportArticleComponent from "../components/articles/ImportArticleComponent";
import LoadingComponent from "../components/LoadingComponent";

export default function CaregivingScreen({ database, userName }) {
	const [caregiving, setCaregiving] = useState();
	const [selectedCaregiving, setSelectedCaregiving] = useState();
	const [openModal, setOpenModal] = useState(false);

	useEffect(() => {
		getCaregiving(database, userName, setCaregiving, setSelectedCaregiving);
	}, []);

	if (caregiving === undefined) return <LoadingComponent />;
	const caregivingList = [];
	for (let i = 0; i < caregiving.length; i++) {
		const article = caregiving[i];
		caregivingList.push(
			<div
				className="toggle"
				onClick={() => {
					setSelectedCaregiving(article);
				}}
				key={i}
			>
				<p
					className={
						selectedCaregiving === article
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
				<Col xs={3} style={{ padding: 30 }} className="listPanel">
					{caregivingList}
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
						articles={caregiving}
						setArticles={setCaregiving}
						article={selectedCaregiving}
						database={database}
						userName={userName}
						type="caregiving"
					/>
				</Col>
			</Row>
			<ImportArticleComponent
				type="caregiving"
				open={openModal}
				setOpen={setOpenModal}
				database={database}
				articles={caregiving}
				setArticles={setCaregiving}
			/>
		</div>
	);
}

async function getCaregiving(
	database,
	userName,
	setCaregiving,
	setSelectedCaregiving
) {
	const ref = doc(database, "users", userName);
	const result = await getDoc(ref);
	const data = result.data();
	setCaregiving(data.caregiving);
	if (data.caregiving.length > 0) {
		setSelectedCaregiving(data.caregiving[0]);
	}
}

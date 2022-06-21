import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { doc, getDoc } from "firebase/firestore/lite";
import EditArticleComponent from "../components/articles/EditArticleComponent";
import ImportArticleComponent from "../components/articles/ImportArticleComponent";

export default function CaregivingScreen({ database, userName }) {
	const [caregiving, setCaregiving] = useState();
	const [selectedCaregiving, setSelectedCaregiving] = useState();
	const [openModal, setOpenModal] = useState(false);

	useEffect(() => {
		getCaregiving(database, userName, setCaregiving);
	}, []);

	if (caregiving === undefined) return <></>;
	const caregivingList = [];
	for (let i = 0; i < caregiving.length; i++) {
		const article = caregiving[i];
		caregivingList.push(
			<div
				className="toggle"
				style={{
					width: "100%",
					paddingLeft: 30,
					paddingRight: 30,
				}}
				onClick={() => {
					setSelectedCaregiving(article);
				}}
				key={i}
			>
				<p>{article.name}</p>
			</div>
		);
	}

	return (
		<div>
			<Row style={{ width: "100%" }}>
				<Col xs={3} style={{ padding: 30 }}>
					{caregivingList}
					<Button
						variant="secondary"
						style={{ width: "100%" }}
						onClick={() => {
							setOpenModal(true);
						}}
					>
						Add
					</Button>
				</Col>
				<Col xs={9} style={{ padding: 30 }}>
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

async function getCaregiving(database, userName, setCaregiving) {
	const ref = doc(database, "users", userName);
	const result = await getDoc(ref);
	const data = result.data();
	setCaregiving(data.caregiving);
}

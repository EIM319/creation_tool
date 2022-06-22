import { Modal } from "react-bootstrap";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore/lite";
import { useEffect, useState } from "react";

export default function ImportArticleComponent({
	type,
	open,
	setOpen,
	database,
	userName,
	articles,
	setArticles,
	setArticle,
}) {
	const [defaultArticles, setDefaultArticles] = useState();

	useEffect(() => {
		getDefaultArticles(type, database, setDefaultArticles);
	}, [type]);

	const items = [];
	if (defaultArticles !== undefined) {
		for (let i = 0; i < defaultArticles.length; i++) {
			items.push(
				<div
					className="toggle"
					onClick={async () => {
						setOpen(false);
						const ref = doc(database, "users", userName);
						const newArticle = Object.assign(
							{},
							defaultArticles[i]
						);
						const newArticles = [...articles, newArticle];
						if (type === "monitoring") {
							await updateDoc(ref, {
								monitoring: newArticles,
							}).then(() => {
								setArticles(newArticles);
								setArticle(newArticle);
							});
						} else if (type === "caregiving") {
							await updateDoc(ref, {
								caregiving: newArticles,
							}).then(() => {
								setArticles(newArticles);
								setArticle(newArticle);
							});
						}
					}}
				>
					<b>{defaultArticles[i].name}</b>
					<p>{defaultArticles[i].purpose}</p>
				</div>
			);
		}
	}

	return (
		<Modal
			centered
			show={open}
			onHide={() => {
				setOpen(false);
			}}
		>
			<Modal.Header closeButton>
				<Modal.Title>Get {getHeaderText(type)}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{items}</Modal.Body>
		</Modal>
	);
}

function getHeaderText(type) {
	if (type === "monitoring") {
		return "Home Monitoring";
	} else if (type === "caregiving") {
		return "Caregiving";
	} else {
		return "Invalid";
	}
}

async function getDefaultArticles(type, database, setDefaultArticles) {
	const array = [];
	if (type === "monitoring") {
		const ref = collection(database, "homemonitoring");
		const documents = await getDocs(ref);
		documents.forEach((doc) => {
			array.push(doc.data());
		});
	} else if (type === "caregiving") {
		const ref = collection(database, "caregiving");
		const documents = await getDocs(ref);
		documents.forEach((doc) => {
			array.push(doc.data());
		});
	}
	setDefaultArticles(array);
}

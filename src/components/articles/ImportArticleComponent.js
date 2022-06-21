import { Modal } from "react-bootstrap";
import { collection, getDocs } from "firebase/firestore/lite";
import { useEffect, useState } from "react";

export default function ImportArticleComponent({
	type,
	open,
	setOpen,
	database,
	articles,
	setArticles,
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
					onClick={() => {
						const newArticles = [...articles, defaultArticles[i]];
						setArticles(newArticles);
						setOpen(false);
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
			<Modal.Header>
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

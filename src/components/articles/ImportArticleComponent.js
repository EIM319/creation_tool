import { Button, Modal } from "react-bootstrap";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

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
	const [selectedArticles, setSelectedArticles] = useState(new Set());

	useEffect(() => {
		getDefaultArticles(type, database, setDefaultArticles);
	}, [type]);

	useEffect(() => {
		selectedArticles.clear();
	}, [open]);

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
			<Modal.Body>
				<Articles
					selectedArticles={selectedArticles}
					setSelectedArticles={setSelectedArticles}
					defaultArticles={defaultArticles}
				/>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
					}}
				>
					<p style={{ fontSize: 13, margin: 0 }}>
						Unable to find what you need?{" "}
						<Link to="/tool">Click Here</Link>
					</p>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					onClick={async () => {
						setOpen(false);
						const ref = doc(database, "users", userName);
						const newArticles = [...articles];
						var first;
						selectedArticles.forEach((index) => {
							const newArticle = Object.assign(
								{},
								defaultArticles[index]
							);
							newArticles.push(newArticle);
							if (first === undefined) {
								first = newArticle;
							}
						});
						await updateDatabase(ref, type, newArticles).then(
							() => {
								setArticles(newArticles);
								setArticle(first);
								toast.success("Import Successful");
							}
						);
					}}
				>
					Add
				</Button>
			</Modal.Footer>
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

async function updateDatabase(ref, type, newArticles) {
	if (type === "monitoring") {
		await updateDoc(ref, {
			monitoring: newArticles,
		});
	} else if (type === "caregiving") {
		await updateDoc(ref, {
			caregiving: newArticles,
		});
	}
}

function Articles({ selectedArticles, setSelectedArticles, defaultArticles }) {
	const items = [];
	console.log(selectedArticles);
	if (defaultArticles !== undefined) {
		for (let i = 0; i < defaultArticles.length; i++) {
			if (selectedArticles.has(i)) {
				items.push(
					<div
						className="toggle"
						onClick={async () => {
							const newSet = new Set(selectedArticles);
							newSet.delete(i);
							setSelectedArticles(newSet);
						}}
					>
						<b style={{ color: "rgb(12, 121, 235)" }}>
							{defaultArticles[i].name}
						</b>
						<p style={{ color: "rgb(12, 121, 235)" }}>
							{defaultArticles[i].purpose}
						</p>
					</div>
				);
			} else {
				items.push(
					<div
						className="toggle"
						onClick={async () => {
							const newSet = new Set(selectedArticles);
							newSet.add(i);
							setSelectedArticles(newSet);
						}}
					>
						<b>{defaultArticles[i].name}</b>
						<p>{defaultArticles[i].purpose}</p>
					</div>
				);
			}
		}
	}
	return items;
}

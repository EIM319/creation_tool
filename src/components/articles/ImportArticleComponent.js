import { Button, Modal, Form, Badge } from "react-bootstrap";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function ImportArticleComponent({
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
	const [keyword, setKeyword] = useState("");

	useEffect(() => {
		selectedArticles.clear();
		if (open) {
			getDefaultArticles(database, setDefaultArticles);
			setKeyword("");
		}
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
				<Modal.Title>Get Patient Education</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Control
					placeholder="Search"
					value={keyword}
					onChange={(event) => {
						setKeyword(event.target.value);
					}}
					style={{ marginBottom: 20 }}
				/>
				<div style={{ height: "50vh", overflow: "auto" }}>
					<Articles
						selectedArticles={selectedArticles}
						setSelectedArticles={setSelectedArticles}
						defaultArticles={defaultArticles}
						keyword={keyword}
					/>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
					}}
				>
					<p style={{ fontSize: 13, margin: 0, paddingRight: 10 }}>
						Unable to find what you need?{" "}
						<Link to="/tool" target="_blank">
							Click Here
						</Link>
					</p>
				</div>
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
						await updateDatabase(ref, newArticles).then(() => {
							setArticles(newArticles);
							setArticle(first);
							toast.success("Import Successful");
						});
					}}
				>
					Add
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

async function getDefaultArticles(database, setDefaultArticles) {
	const array = [];
	const ref = collection(database, "homemonitoring");
	const documents = await getDocs(ref);
	documents.forEach((doc) => {
		array.push(doc.data());
	});
	setDefaultArticles(array);
}

async function updateDatabase(ref, newArticles) {
	await updateDoc(ref, {
		monitoring: newArticles,
	});
}

function Articles({
	selectedArticles,
	setSelectedArticles,
	defaultArticles,
	keyword,
}) {
	const items = [];
	if (defaultArticles !== undefined) {
		for (let i = 0; i < defaultArticles.length; i++) {
			if (
				defaultArticles[i].name
					.toLowerCase()
					.includes(keyword.toLowerCase()) ||
				defaultArticles[i].tag
					.toLowerCase()
					.includes(keyword.toLowerCase())
			) {
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
							<b
								style={{
									color: "rgb(12, 121, 235)",
									marginRight: 10,
								}}
							>
								{defaultArticles[i].name}
							</b>
							{defaultArticles[i].tag !== "" ? (
								<Badge
									style={{
										width: "fit-content",
										marginRight: 10,
									}}
								>
									{defaultArticles[i].tag}
								</Badge>
							) : null}
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
							<b style={{ marginRight: 10 }}>
								{defaultArticles[i].name}
							</b>
							{defaultArticles[i].tag !== "" ? (
								<Badge
									bg="secondary"
									style={{
										width: "fit-content",
										marginRight: 10,
									}}
								>
									{defaultArticles[i].tag}
								</Badge>
							) : null}
							<p>{defaultArticles[i].purpose}</p>
						</div>
					);
				}
			}
		}
	}
	return items;
}

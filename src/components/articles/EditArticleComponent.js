import { doc, updateDoc } from "firebase/firestore/lite";
import { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import HeaderComponent from "./HeaderComponent";
import PurposeComponent from "./PurposeComponent";
import { FaSave, FaEdit } from "react-icons/fa";
import ConfirmDeleteComponent from "./ConfirmDeleteComponent";
import { toast } from "react-toastify";
import ImageComponent from "./ImageComponent";
import PreviewComponent from "./PreviewComponent";
import ContentSelectorComponent from "./ContentSelectorComponent";
import IsMonitoringComponent from "./IsMonitoringComponent";

export default function EditArticleComponent({
	articles,
	setArticles,
	article,
	setArticle,
	database,
	userName,
	storage,
}) {
	const [modifiedArticle, setModifiedArticle] = useState();
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [isSaving, setSaving] = useState(false);
	const [isEditing, setEditing] = useState(false);

	useEffect(() => {
		if (article === undefined) return;
		setModifiedArticle(Object.assign({}, article));
		setEditing(false);
	}, [article]);

	if (modifiedArticle === undefined) return <></>;

	async function save() {
		if (modifiedArticle === undefined) return;
		setSaving(true);
		const index = articles.indexOf(article);
		const newArticles = [...articles];
		newArticles[index] = modifiedArticle;
		const ref = doc(database, "users", userName);
		await updateDoc(ref, {
			monitoring: newArticles,
		}).then(() => {
			setSaving(false);
			setEditing(false);
			setArticles(newArticles);
			setArticle(modifiedArticle);
			toast.success("Save Successful");
		});
	}

	function EditComponent() {
		return (
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					overflowY: "auto",
					padding: "0px 30px 0px 30px",
				}}
			>
				<HeaderComponent article={modifiedArticle} />
				<PurposeComponent article={modifiedArticle} />
				<ImageComponent article={modifiedArticle} />
				<IsMonitoringComponent article={modifiedArticle} />

				<ContentSelectorComponent
					article={modifiedArticle}
					setArticle={setModifiedArticle}
					storage={storage}
				/>
				<div className="line" />
				<br />
				<b style={{ paddingBottom: 10, fontSize: 20 }}>Controls</b>
				<Button
					style={{ width: "fit-content" }}
					variant="danger"
					onClick={() => {
						setShowDeleteModal(true);
					}}
				>
					Delete Article
				</Button>
				<br />
			</div>
		);
	}

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				height: "100vh",
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					padding: 30,
				}}
			>
				<p style={{ fontSize: 30, margin: 0 }}>
					{modifiedArticle.name}
				</p>
				<div style={{ display: "flex", flexDirection: "row" }}>
					{isEditing ? (
						isSaving ? (
							<Spinner animation="border" role="status" />
						) : (
							<FaSave
								size={30}
								onClick={save}
								className="toggle"
							/>
						)
					) : (
						<FaEdit
							size={30}
							className="toggle"
							onClick={() => {
								setEditing(true);
							}}
						/>
					)}
				</div>
			</div>
			{isEditing ? (
				<EditComponent />
			) : (
				<PreviewComponent article={article} />
			)}
			<ConfirmDeleteComponent
				show={showDeleteModal}
				setShow={setShowDeleteModal}
				database={database}
				userName={userName}
				articles={articles}
				setArticles={setArticles}
				article={article}
				setArticle={setArticle}
			/>
		</div>
	);
}

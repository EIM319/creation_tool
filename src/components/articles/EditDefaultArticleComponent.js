import { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import HeaderComponent from "./HeaderComponent";
import PurposeComponent from "./PurposeComponent";
import ImageComponent from "./ImageComponent";
import ConfirmDeleteDefaultComponent from "./ConfirmDeleteDefaultComponent";
import { FaSave, FaEye } from "react-icons/fa";
import { updateDoc } from "firebase/firestore/lite";
import { toast } from "react-toastify";
import DefaultPreviewComponent from "./DefaultPreviewComponent";
import IsMonitoringComponent from "./IsMonitoringComponent";

import ContentSelectorComponent from "./ContentSelectorComponent";
import TagComponent from "./TagComponent";

export default function EditDefaultArticleComponent({
	articles,
	setArticles,
	article,
	setArticle,
	storage,
}) {
	const [modifiedArticle, setModifiedArticle] = useState();
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showPreviewModal, setShowPreviewModal] = useState(false);
	const [isSaving, setSaving] = useState(false);

	useEffect(() => {
		if (article === undefined) return;
		setModifiedArticle(Object.assign({}, article.data));
	}, [article]);

	if (modifiedArticle === undefined) return <></>;

	async function save() {
		if (modifiedArticle === undefined) return;
		setSaving(true);
		const ref = article.ref;
		updateDoc(ref, modifiedArticle).then(() => {
			const index = articles.indexOf(article);
			if (index < 0) return;
			const newArticle = new Object(article);
			newArticle.data = modifiedArticle;
			setArticle(newArticle);
			const newArticles = [...articles];
			newArticles[index] = newArticle;
			setArticles(newArticles);
			setSaving(false);
			toast.success("Article Updated");
		});
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
					<FaEye
						size={30}
						onClick={() => {
							setShowPreviewModal(true);
						}}
						className="toggle"
						style={{ marginRight: 20 }}
					/>
					{isSaving ? (
						<Spinner animation="border" role="status" />
					) : (
						<FaSave size={30} onClick={save} className="toggle" />
					)}
				</div>
			</div>
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
				<TagComponent article={modifiedArticle} />
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
			<ConfirmDeleteDefaultComponent
				show={showDeleteModal}
				setShow={setShowDeleteModal}
				articles={articles}
				setArticles={setArticles}
				article={article}
				setArticle={setArticle}
			/>
			<DefaultPreviewComponent
				show={showPreviewModal}
				setShow={setShowPreviewModal}
				article={modifiedArticle}
			/>
		</div>
	);
}

import { doc, updateDoc } from "firebase/firestore/lite";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import ContentListComponent from "./ContentListComponent";
import DaySelectorComponent from "./DaySelectorComponent";
import HeaderComponent from "./HeaderComponent";
import PurposeComponent from "./PurposeComponent";
import TimeSelectorComponent from "./TimeSelectorComponent";
import { FaSave, FaEye } from "react-icons/fa";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { toast } from "react-toastify";
import ImageComponent from "./ImageComponent";
import PreviewComponent from "./PreviewComponent";

export default function EditArticleComponent({
	articles,
	setArticles,
	article,
	setArticle,
	database,
	userName,
	type,
}) {
	const [modifiedArticle, setModifiedArticle] = useState();
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showPreviewModal, setShowPreviewModal] = useState(false);

	useEffect(() => {
		setModifiedArticle(Object.assign({}, article));
	}, [article]);

	if (modifiedArticle === undefined) return <></>;

	async function save() {
		if (modifiedArticle === undefined) return;
		const index = articles.indexOf(article);
		const newArticles = [...articles];
		newArticles[index] = modifiedArticle;
		const ref = doc(database, "users", userName);
		if (type === "monitoring") {
			await updateDoc(ref, {
				monitoring: newArticles,
			}).then(() => {
				setArticles(newArticles);
				setArticle(modifiedArticle);
				toast.success("Save Successful");
			});
		} else if (type === "caregiving") {
			await updateDoc(ref, {
				caregiving: newArticles,
			}).then(() => {
				setArticles(newArticles);
				setArticle(modifiedArticle);
				toast.success("Save Successful");
			});
		}
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
					<FaSave size={30} onClick={save} className="toggle" />
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
				<b style={{ paddingBottom: 10, fontSize: 20 }}>Title</b>
				<HeaderComponent article={modifiedArticle} />
				<br />
				<b style={{ paddingBottom: 10, fontSize: 20 }}>Purpose</b>
				<PurposeComponent article={modifiedArticle} />
				<br />
				<b style={{ paddingBottom: 10, fontSize: 20 }}>Banner Image</b>
				<ImageComponent article={modifiedArticle} />
				<br />
				{type === "monitoring" ? (
					<>
						<b style={{ paddingBottom: 10, fontSize: 20 }}>Day</b>
						<DaySelectorComponent article={modifiedArticle} />
						<br />
						<b style={{ paddingBottom: 10, fontSize: 20 }}>Time</b>
						<TimeSelectorComponent article={modifiedArticle} />
						<br />
					</>
				) : null}
				<b style={{ paddingBottom: 10, fontSize: 20 }}>Content</b>
				<ContentListComponent
					article={modifiedArticle}
					setArticle={setModifiedArticle}
				/>
				<br />
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
			<ConfirmDeleteModal
				show={showDeleteModal}
				setShow={setShowDeleteModal}
				database={database}
				userName={userName}
				articles={articles}
				setArticles={setArticles}
				article={article}
				setArticle={setArticle}
				type={type}
			/>
			<PreviewComponent
				show={showPreviewModal}
				setShow={setShowPreviewModal}
				article={modifiedArticle}
			/>
		</div>
	);
}

import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import ContentListComponent from "./ContentListComponent";
import DaySelectorComponent from "./DaySelectorComponent";
import HeaderComponent from "./HeaderComponent";
import PurposeComponent from "./PurposeComponent";
import TimeSelectorComponent from "./TimeSelectorComponent";
import { FaSave } from "react-icons/fa";
import { collection, updateDoc } from "firebase/firestore/lite";
import { toast } from "react-toastify";

export default function EditDefaultArticleComponent({
	articles,
	setArticles,
	article,
	setArticle,
	database,
	type,
}) {
	const [modifiedArticle, setModifiedArticle] = useState();

	useEffect(() => {
		if (article === undefined) return;
		setModifiedArticle(Object.assign({}, article.data));
	}, [article]);

	if (modifiedArticle === undefined) return <></>;

	async function save() {
		if (modifiedArticle === undefined) return;
		const ref = article.ref;
		updateDoc(ref, modifiedArticle).then(() => {
			const index = articles.indexOf(article);
			if (index < 0) return;
			const newArticle = new Object(article);
			newArticle.data = modifiedArticle;
			setArticle(newArticle);
			const newArticles = new Object(articles);
			newArticles[index] = newArticle;
			setArticles(newArticles);
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
				<FaSave size={30} onClick={save} className="toggle" />
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
					onClick={() => {}}
				>
					Delete Article
				</Button>
				<br />
			</div>
		</div>
	);
}

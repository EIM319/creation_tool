import { doc, updateDoc } from "firebase/firestore/lite";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import ContentListComponent from "./ContentListComponent";
import HeaderComponent from "./HeaderComponent";
import PurposeComponent from "./PurposeComponent";

export default function EditArticleComponent({
	articles,
	setArticles,
	article,
	database,
	userName,
	type,
}) {
	const [modifiedArticle, setModifiedArticle] = useState();

	useEffect(() => {
		setModifiedArticle(article);
	}, [article]);

	if (modifiedArticle === undefined) return <></>;

	async function save() {
		if (modifiedArticle === undefined) return;
		const index = articles.indexOf(article);
		const newArticles = new Object(articles);
		newArticles[index] = modifiedArticle;
		const ref = doc(database, "users", userName);
		if (type === "monitoring") {
			await updateDoc(ref, {
				monitoring: newArticles,
			}).then(() => {
				setArticles(newArticles);
			});
		} else if (type === "caregiving") {
			await updateDoc(ref, {
				caregiving: newArticles,
			}).then(() => {
				setArticles(newArticles);
			});
		}
	}

	return (
		<div style={{ display: "flex", flexDirection: "column" }}>
			<b>Title</b>
			<HeaderComponent article={modifiedArticle} />
			<br />
			<b>Purpose</b>
			<PurposeComponent article={modifiedArticle} />
			<br />
			<b>Content</b>
			<ContentListComponent
				article={modifiedArticle}
				setArticle={setModifiedArticle}
			/>
			<Button onClick={save}>Save</Button>
		</div>
	);
}

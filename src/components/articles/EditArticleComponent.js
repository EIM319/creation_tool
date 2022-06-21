import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import ContentListComponent from "./ContentListComponent";
import HeaderComponent from "./HeaderComponent";
import PurposeComponent from "./PurposeComponent";

export default function EditArticleComponent({ article }) {
	const [modifiedArticle, setModifiedArticle] = useState();

	useEffect(() => {
		setModifiedArticle(article);
	}, [article]);

	if (modifiedArticle === undefined) return <></>;

	function save() {
		console.log(modifiedArticle);
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
			<Button
				variant="secondary"
				style={{ marginBottom: 10 }}
				onClick={() => {
					const newArticle = new Object(modifiedArticle);
					newArticle.content = [
						...modifiedArticle.content,
						{ type: "instruction", content: "" },
					];
					setModifiedArticle(newArticle);
				}}
			>
				Add
			</Button>
			<Button onClick={save}>Save</Button>
		</div>
	);
}

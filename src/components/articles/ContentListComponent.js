import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import ContentComponent from "./ContentComponent";

export default function ContentListComponent({ article, setArticle }) {
	const [content, setContent] = useState();

	useEffect(() => {
		setContent(article.content);
	}, [article]);

	if (content === undefined) return null;

	const contentList = [];
	for (let i = 0; i < content.length; i++) {
		contentList.push(
			<ContentComponent
				content={content}
				setContent={setContent}
				article={article}
				setArticle={setArticle}
				index={i}
			/>
		);
	}
	contentList.push(
		<Button
			style={{ width: "fit-content" }}
			variant="secondary"
			onClick={() => {
				const newContent = [
					...content,
					{ type: "instruction", content: "" },
				];
				setContent(newContent);
				const newArticle = new Object(article);
				newArticle.content = newContent;
				setArticle(newArticle);
			}}
		>
			Add Content
		</Button>
	);
	return (
		<div style={{ display: "flex", flexDirection: "column" }}>
			<b style={{ paddingBottom: 10, fontSize: 20 }}>Content</b>
			{contentList}
			<br />
		</div>
	);
}

import { useEffect, useState } from "react";
import PDFComponent from "./PDFComponent";
import ContentListComponent from "./ContentListComponent";

export default function ContentSelectorComponent({
	article,
	setArticle,
	storage,
}) {
	const [isPdf, setPdf] = useState(false);

	useEffect(() => {
		setPdf(article.pdf !== undefined && article.pdf !== null);
	}, [article]);

	return (
		<div
			style={{
				padding: 20,
				borderRadius: 5,
				borderColor: "#C5C5C5",
				borderWidth: 1,
				borderStyle: "solid",
			}}
		>
			{isPdf ? (
				<PDFComponent article={article} storage={storage} />
			) : (
				<>
					<ContentListComponent
						article={article}
						setArticle={setArticle}
					/>
				</>
			)}
		</div>
	);
}

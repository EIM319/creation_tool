import { useEffect, useState } from "react";
import IsMonitoringComponent from "./IsMonitoringComponent";
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

	function Toggles() {
		if (!isPdf) {
			return (
				<>
					<p
						className="toggle"
						style={{
							padding: "10px 20px",
							background: "var(--accent)",
							color: "white",
							borderRadius: 10,
						}}
					>
						Article
					</p>
					<p
						className="toggle"
						style={{
							padding: "10px 20px",
							borderRadius: 10,
						}}
						onClick={() => {
							setPdf(true);
							article.pdf = null;
						}}
					>
						PDF
					</p>
				</>
			);
		} else {
			return (
				<>
					<p
						className="toggle"
						style={{
							padding: "10px 20px",
							borderRadius: 10,
						}}
						onClick={() => {
							setPdf(false);
							article.pdf = null;
						}}
					>
						Article
					</p>
					<p
						className="toggle"
						style={{
							padding: "10px 20px",
							background: "var(--accent)",
							color: "white",
							borderRadius: 10,
						}}
					>
						PDF
					</p>
				</>
			);
		}
	}

	return (
		<>
			<b style={{ paddingBottom: 10, fontSize: 20 }}>Type</b>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
				}}
			>
				<Toggles />
			</div>
			<br />
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
						<IsMonitoringComponent article={article} />
						<ContentListComponent
							article={article}
							setArticle={setArticle}
						/>
					</>
				)}
			</div>
		</>
	);
}

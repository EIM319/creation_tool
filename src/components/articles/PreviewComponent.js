import { useEffect, useState } from "react";
import { Image, Spinner } from "react-bootstrap";
import YouTube from "./Youtube";

export default function PreviewComponent({ article }) {
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
	}, [article]);

	if (article === undefined || article.content === undefined) return null;

	if (article.pdf !== undefined && article.pdf !== null) {
		return (
			<>
				{isLoading ? (
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							width: "100%",
							height: "85vh",
						}}
					>
						<Spinner animation="border" role="status" />
					</div>
				) : null}
				<iframe
					src={article.pdf}
					style={{ width: "100%", height: "85vh" }}
					onLoad={() => {
						setLoading(false);
					}}
				/>
			</>
		);
	}

	const components = [];
	article.content.forEach((item) => {
		switch (item.type) {
			case "image":
				components.push(
					<Image
						src={item.content}
						style={{
							width: "75%",
							aspectRatio: 1,
							objectFit: "contain",
						}}
					/>
				);
				break;
			case "video":
				components.push(<YouTube id={item.content} />);
				break;
			case "section":
				components.push(
					<p
						style={{
							fontWeight: 700,
							fontSize: 17,
							paddingTop: 20,
							paddingBottom: 10,
						}}
					>
						{item.content}
					</p>
				);
				break;
			case "instruction":
				components.push(
					<p style={{ paddingBottom: 10 }}> {item.content} </p>
				);
				break;
			default: {
				components.push(
					<p style={{ fontStyle: "italic", paddingBottom: 10 }}>
						{item.content}
					</p>
				);
			}
		}
	});

	return (
		<div
			style={{
				padding: "0px 30px 30px 30px",
				overflowY: "auto",
			}}
		>
			<div style={{ maxWidth: 700 }}>{components}</div>
		</div>
	);
}

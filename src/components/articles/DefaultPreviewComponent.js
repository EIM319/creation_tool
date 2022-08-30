import { useEffect, useState } from "react";
import { Image, Row, Modal, Spinner } from "react-bootstrap";
import YouTube from "./Youtube";

export default function DefaultPreviewComponent({ show, setShow, article }) {
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
	}, [show]);

	if (article === undefined || article.content === undefined) return null;

	if (article.pdf !== undefined && article.pdf !== null) {
		return (
			<Modal show={show} onHide={() => setShow(false)} size="xl" centered>
				<Modal.Header closeButton>
					<Modal.Title>{article.name}</Modal.Title>
				</Modal.Header>
				{isLoading ? (
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							width: "100%",
							height: "80vh",
						}}
					>
						<Spinner animation="border" role="status" />
					</div>
				) : null}
				<iframe
					src={article.pdf}
					style={{
						width: "100%",
						height: "80vh",
						display: getHide(),
					}}
					onLoad={() => {
						setLoading(false);
					}}
				/>{" "}
			</Modal>
		);
	}

	function getHide() {
		if (isLoading) {
			return "none";
		} else {
			return "flex";
		}
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
		<Modal show={show} onHide={() => setShow(false)} centered>
			<Modal.Header closeButton>
				<Modal.Title>{article.name}</Modal.Title>
			</Modal.Header>
			<Row style={{ padding: 20 }}>{components}</Row>
		</Modal>
	);
}

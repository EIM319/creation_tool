import { Image, Row, Modal } from "react-bootstrap";
import YouTube from "./Youtube";

export default function DefaultPreviewComponent({ show, setShow, article }) {
	if (article === undefined || article.content === undefined) return null;

	if (article.pdf !== undefined && article.pdf !== null) {
		return (
			<Modal show={show} onHide={() => setShow(false)} size="xl" centered>
				<Modal.Header closeButton>
					<Modal.Title>{article.name}</Modal.Title>
				</Modal.Header>
				<iframe
					src={article.pdf}
					style={{ width: "100%", height: "80vh", marginTop: 20 }}
				/>{" "}
			</Modal>
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
		<Modal show={show} onHide={() => setShow(false)} centered>
			<Modal.Header closeButton>
				<Modal.Title>{article.name}</Modal.Title>
			</Modal.Header>
			<Row style={{ padding: 20 }}>{components}</Row>
		</Modal>
	);
}

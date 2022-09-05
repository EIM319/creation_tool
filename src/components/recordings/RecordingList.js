import { Row, Col } from "react-bootstrap";

export default function RecordingList({ selectedRecording }) {
	if (selectedRecording === undefined) return null;
	const list = [];
	selectedRecording[1].forEach((item) => {
		const date = Date(item.date).split(" GMT");
		list.push(
			<Row style={{ paddingTop: 10 }}>
				<Col>{item.value}</Col>
				<Col>{date[0]}</Col>
			</Row>
		);
	});
	return (
		<Col className="card" style={{ padding: 20 }}>
			<Row>
				<Col>
					<b>Value</b>
				</Col>
				<Col>
					<b>Date</b>
				</Col>
			</Row>
			<div style={{ height: 300, overflowY: "auto" }}>{list}</div>
		</Col>
	);
}

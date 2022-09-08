import { Row, Col } from "react-bootstrap";

export default function RecordingList({ selectedRecording }) {
	if (selectedRecording === undefined) return null;
	const list = [];
	if (selectedRecording[1][0].type === "Check-In") {
		selectedRecording[1].forEach((item) => {
			const date = item.date.split(" GMT");
			list.push(
				<Row style={{ paddingTop: 10 }}>
					<Col>{date[0]}</Col>
				</Row>
			);
		});
		return (
			<Col className="card" style={{ padding: 20 }}>
				<Row>
					<Col>
						<b>Date/Time</b>
					</Col>
				</Row>
				<div style={{ height: 300, overflowY: "auto" }}>{list}</div>
			</Col>
		);
	} else {
		selectedRecording[1].forEach((item) => {
			const date = item.date.split(" GMT");
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
						<b>Date/Time</b>
					</Col>
				</Row>
				<div style={{ height: 300, overflowY: "auto" }}>{list}</div>
			</Col>
		);
	}
}

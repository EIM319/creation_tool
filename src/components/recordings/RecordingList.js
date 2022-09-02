import { Row, Col } from "react-bootstrap";

export default function RecordingList({ selectedRecording }) {
	if (selectedRecording === undefined) return null;
	const list = [];
	selectedRecording[1].forEach((item) => {
		list.push(
			<Row>
				<Col>{item.value}</Col>
				<Col>{item.date}</Col>
			</Row>
		);
	});
	return (
		<Col style={{ padding: 20 }}>
			<Row>
				<Col>
					<b>Value</b>
				</Col>
				<Col>
					<b>Date</b>
				</Col>
			</Row>

			{list}
		</Col>
	);
}

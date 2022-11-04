import { Row, Col } from "react-bootstrap";

export default function RecordingList({ selectedRecording }) {
	if (selectedRecording === undefined) return null;
	const list = [];
	if (selectedRecording[1][0].type === "Check-In") {
		selectedRecording[1].forEach((item) => {
			list.push(
				<Row style={{ paddingTop: 10 }}>
					<Col xs={4}>{getTimeText(item.timeSegment)}</Col>
					<Col>{item.date.substring(0, 10)}</Col>
				</Row>
			);
		});
		return (
			<Col className="card" style={{ padding: 20 }}>
				<Row>
					<Col xs={4}>
						<b>Time</b>
					</Col>
					<Col>
						<b>Date</b>
					</Col>
				</Row>
				<div style={{ height: 300, overflowY: "auto" }}>{list}</div>
			</Col>
		);
	} else {
		selectedRecording[1].forEach((item) => {
			list.push(
				<Row style={{ paddingTop: 10 }}>
					<Col>{getTimeText(item.timeSegment)}</Col>
					<Col>{item.date.substring(0, 10)}</Col>
					<Col>{item.value}</Col>
				</Row>
			);
		});
		return (
			<Col className="card" style={{ padding: 20 }}>
				<Row>
					<Col>
						<b>Time</b>
					</Col>
					<Col>
						<b>Date</b>
					</Col>
					<Col>
						<b>Value</b>
					</Col>
				</Row>
				<div style={{ height: 300, overflowY: "auto" }}>{list}</div>
			</Col>
		);
	}
}

const timeText = [
	"Before Breakfast",
	"After Breakfast",
	"Before Lunch",
	"After Lunch",
	"Before Dinner",
	"After Dinner",
	"Before Sleep",
];
function getTimeText(index) {
	if (index === undefined || index === null) return "Any Time";
	return timeText[index];
}

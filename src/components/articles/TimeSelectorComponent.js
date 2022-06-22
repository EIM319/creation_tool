import { useEffect, useState } from "react";
import { Col, Row, Form } from "react-bootstrap";

export default function TimeSelectorComponent({ article }) {
	const [selection, setSelection] = useState();
	useEffect(() => {
		setSelection(article.time);
	}, [article]);

	if (selection === undefined) return <></>;

	const selectors = [];
	const headers = [];
	for (let i = 0; i < 7; i++) {
		headers.push(
			<Col className="tableHeader">
				<p
					style={{
						color: "white",
						margin: 10,
						fontWeight: 500,
						textAlign: "center",
					}}
				>
					{timeText[i]}
				</p>
			</Col>
		);
		selectors.push(
			<Col
				className="tableBody"
				onClick={() => {
					const newSelection = [...selection];
					newSelection[i] = !newSelection[i];
					setSelection(newSelection);
					article.time = newSelection;
				}}
			>
				<Form.Check checked={selection[i]} />
			</Col>
		);
	}

	return (
		<div style={{ margin: 10 }}>
			<Row>{headers}</Row>
			<Row>{selectors}</Row>
		</div>
	);
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

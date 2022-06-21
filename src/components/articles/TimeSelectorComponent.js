import { useEffect, useState } from "react";
import { Col, Row, Form } from "react-bootstrap";

export default function TimeSelectorComponent({ article }) {
	const [selection, setSelection] = useState();
	useEffect(() => {
		setSelection(article.time);
	}, [article]);

	if (selection === undefined) return <></>;

	const selectors = [];
	for (let i = 0; i < 7; i++) {
		selectors.push(
			<Col style={{ display: "flex", flexDirection: "row" }}>
				<p style={{ marginRight: 10 }}>{timeText[i]}</p>
				<Form.Check
					checked={selection[i]}
					onClick={() => {
						const newSelection = [...selection];
						newSelection[i] = !newSelection[i];
						setSelection(newSelection);
						article.time = newSelection;
					}}
				/>
			</Col>
		);
	}

	return <Row>{selectors}</Row>;
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

import { useEffect, useState } from "react";
import { Col, Row, Form } from "react-bootstrap";

export default function DaySelectorComponent({ article }) {
	const [selection, setSelection] = useState();
	useEffect(() => {
		setSelection(article.days);
	}, [article]);

	if (selection === undefined) return <></>;

	const selectors = [];
	const headers = [];
	for (let i = 0; i < 7; i++) {
		headers.push(
			<Col className="tableHeader">
				<p style={{ color: "white", margin: 10, fontWeight: 500 }}>
					{days[i]}
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
					article.days = newSelection;
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

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

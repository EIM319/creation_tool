import { useEffect, useState } from "react";
import { Col, Row, Form } from "react-bootstrap";

export default function DaySelectorComponent({ article }) {
	const [selection, setSelection] = useState();
	useEffect(() => {
		setSelection(article.days);
	}, [article]);

	if (selection === undefined) return <></>;

	const selectors = [];
	for (let i = 0; i < 7; i++) {
		selectors.push(
			<Col style={{ display: "flex", flexDirection: "row" }}>
				<p style={{ marginRight: 10 }}>{days[i]}</p>
				<Form.Check
					checked={selection[i]}
					onClick={() => {
						const newSelection = [...selection];
						newSelection[i] = !newSelection[i];
						setSelection(newSelection);
						article.days = newSelection;
					}}
				/>
			</Col>
		);
	}

	return <Row>{selectors}</Row>;
}

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

import { Dropdown } from "react-bootstrap";
import { useEffect } from "react";
import { useState } from "react";

export default function MonitoringTypeComponent({ article }) {
	const [type, setType] = useState();
	useEffect(() => {
		setType(article.recordingType);
	}, [article]);

	function Toggles() {
		const array = [];
		array.push(
			<Dropdown.Item
				onClick={() => {
					setType(null);
					article.recordingType = null;
				}}
			>
				None
			</Dropdown.Item>
		);
		monitoringType.forEach((item) => {
			array.push(
				<Dropdown.Item
					onClick={() => {
						setType(item);
						article.recordingType = item;
					}}
				>
					{item}
				</Dropdown.Item>
			);
		});
		return array;
	}

	return (
		<div>
			<b style={{ fontSize: 20 }}>Monitoring Type</b>
			<div style={{ marginTop: 10 }}>
				<Dropdown>
					<Dropdown.Toggle>
						{type === undefined || type === null ? "None" : type}
					</Dropdown.Toggle>
					<Dropdown.Menu>
						<Toggles />
					</Dropdown.Menu>
				</Dropdown>
			</div>
		</div>
	);
}

export const monitoringType = ["Number", "Text", "Check-In"];

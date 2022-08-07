import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import DaySelectorComponent from "./DaySelectorComponent";
import TimeSelectorComponent from "./TimeSelectorComponent";

export default function IsMonitoringComponent({ article }) {
	const [isSelected, setSelected] = useState(false);

	useEffect(() => {
		setSelected(article.isMonitoring);
	}, [article]);

	return (
		<>
			<b style={{ paddingBottom: 10, fontSize: 20 }}>Has Schedule</b>
			<Form.Check
				checked={isSelected}
				onClick={() => {
					setSelected(!isSelected);
					article.isMonitoring = !isSelected;
				}}
			/>
			<br />
			{isSelected ? (
				<>
					<b style={{ paddingBottom: 10, fontSize: 20 }}>Day</b>
					<DaySelectorComponent article={article} />
					<br />
					<b style={{ paddingBottom: 10, fontSize: 20 }}>Time</b>
					<TimeSelectorComponent article={article} />
					<br />
				</>
			) : null}
		</>
	);
}

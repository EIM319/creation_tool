import { useEffect, useState } from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	ResponsiveContainer,
	CartesianGrid,
	Tooltip,
} from "recharts";

export default function RecordingGraph({ selectedRecording }) {
	const [data, setData] = useState([]);

	useEffect(() => {
		if (selectedRecording === undefined) return;
		const newData = [];
		selectedRecording[1].forEach((item) => {
			if (item.value !== undefined) {
				newData.push({
					value: item.value,
					date: item.date.split("GMT")[0],
				});
			}
		});
		setData(newData);
	}, [selectedRecording]);

	if (selectedRecording === undefined) return null;

	return (
		<div className="card" style={{ padding: 20, height: 366 }}>
			<ResponsiveContainer>
				<LineChart width="100%" height={300} data={data}>
					<Line type="monotone" dataKey="value" stroke="#8884d8" />
					<XAxis dataKey="date" />
					<YAxis />
					<CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
					<Tooltip />
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}

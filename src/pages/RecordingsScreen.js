import { useEffect } from "react";
import { useState } from "react";
import LoadingComponent from "../components/LoadingComponent";
import { collection, getDocs } from "firebase/firestore/lite";
import { Row, Col } from "react-bootstrap";
import RecordingsSelector from "../components/recordings/RecordingSelector";
import RecordingList from "../components/recordings/RecordingList";
import RecordingGraph from "../components/recordings/RecordingGraph";

export default function RecordingsScreen({ database, userName }) {
	const [recordings, setRecordings] = useState();
	const [selectedRecording, setSelectedRecording] = useState();

	useEffect(() => {
		getRecordings(database, userName, setRecordings, setSelectedRecording);
	}, []);

	if (recordings === undefined) return <LoadingComponent />;
	return (
		<div style={{ padding: 40 }}>
			<RecordingsSelector
				recordings={recordings}
				setSelectedRecording={setSelectedRecording}
				selectedRecording={selectedRecording}
			/>
			{selectedRecording === undefined ? null : (
				<p style={{ fontSize: 30, margin: 0, padding: "20px 0px" }}>
					{selectedRecording[0]}
				</p>
			)}
			<Row>
				<Col xs={4}>
					<RecordingList selectedRecording={selectedRecording} />
				</Col>
				<Col xs={8}>
					<RecordingGraph selectedRecording={selectedRecording} />
				</Col>
			</Row>
		</div>
	);
}

async function getRecordings(
	database,
	userName,
	setRecordings,
	setSelectedRecording
) {
	const ref = collection(database, "users", userName, "measurements");
	const docs = (await getDocs(ref)).docs;
	const map = new Map();
	if (docs.length > 0) {
		const readings = docs[0].data().readings;
		readings.forEach((reading) => {
			if (!map.has(reading.item)) {
				map.set(reading.item, [reading]);
			} else {
				map.set(reading.item, [...map.get(reading.item), reading]);
			}
		});
		setSelectedRecording(map.entries().next().value);
	}
	map.forEach((value, key) => {
		value.sort((a, b) => {
			return a.datetime - b.datetime;
		});
	});
	setRecordings(map);
}

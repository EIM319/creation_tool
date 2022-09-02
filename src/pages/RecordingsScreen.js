import { useEffect } from "react";
import { useState } from "react";
import LoadingComponent from "../components/LoadingComponent";
import { collection, getDocs } from "firebase/firestore/lite";
import RecordingsSelector from "../components/recordings/RecordingSelector";
import RecordingList from "../components/recordings/RecordingList";

export default function RecordingsScreen({ database, userName }) {
	const [recordings, setRecordings] = useState();
	const [selectedRecording, setSelectedRecording] = useState();

	useEffect(() => {
		getRecordings(database, userName, setRecordings, setSelectedRecording);
	}, []);

	if (recordings === undefined) return <LoadingComponent />;
	return (
		<>
			<RecordingsSelector
				recordings={recordings}
				setSelectedRecording={setSelectedRecording}
				selectedRecording={selectedRecording}
			/>
			<RecordingList selectedRecording={selectedRecording} />
		</>
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
	setRecordings(map);
}

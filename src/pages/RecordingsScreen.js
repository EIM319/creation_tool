import { useEffect } from "react";
import { useState } from "react";
import LoadingComponent from "../components/LoadingComponent";
import { collection, getDocs } from "firebase/firestore/lite";

export default function RecordingsScreen({ database, userName }) {
	const [recordings, setRecordings] = useState();
	useEffect(() => {
		getRecordings(database, userName, setRecordings);
	}, []);

	if (recordings === undefined) return <LoadingComponent />;
	console.log(recordings);
}

async function getRecordings(database, userName, setRecordings) {
	const ref = collection(database, "users", userName, "measurements");
	const docs = (await getDocs(ref)).docs;
	const map = new Map();
	if (docs.length > 0) {
		const readings = docs[0].data().readings;
		readings.forEach((reading) => {
			if (!map.has(reading.item)) {
				map[reading.item] = [];
			}
			map[reading.item].push(reading);
		});
	}
	setRecordings(map);
}

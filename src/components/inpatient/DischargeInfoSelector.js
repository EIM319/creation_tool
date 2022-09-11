import { useEffect } from "react";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { doc, setDoc } from "firebase/firestore/lite";

export default function DischargeInfoSelector({
	status,
	setStatus,
	setSaving,
	database,
	userName,
}) {
	const [selected, setSelected] = useState();
	useEffect(() => {
		if (status !== undefined && status !== null) {
			setSelected(status.dischargeInfo);
		}
	}, [status]);

	async function setInfo(index) {
		setSaving(true);
		const ref = doc(database, "hospitalization", userName);
		const newStatus = Object.assign({}, status);
		newStatus.dischargeInfo = index;
		await setDoc(ref, newStatus);
		setStatus(newStatus);
		setSaving(false);
	}

	function Cards() {
		const array = [];
		for (let i = 0; i < articles.length; i++) {
			const article = articles[i];
			if (selected === i) {
				array.push(
					<Col xs={4} key={article.title}>
						<div
							className="toggle"
							style={{
								height: "100%",
								padding: 15,
								borderRadius: 10,
								borderWidth: 1,
								borderColor: "#c5c5c5",
								borderStyle: "solid",
								background: "var(--accent-dark)",
								color: "white",
							}}
						>
							<p style={{ fontWeight: 500, fontSize: 20 }}>
								{article.title}
							</p>
							<p>{article.description}</p>
						</div>
					</Col>
				);
			} else {
				array.push(
					<Col xs={4} key={article.title}>
						<div
							className="toggle"
							style={{
								height: "100%",
								padding: 15,
								borderRadius: 10,
								borderWidth: 1,
								borderColor: "#c5c5c5",
								borderStyle: "solid",
							}}
							onClick={() => {
								setInfo(i);
							}}
						>
							<p style={{ fontWeight: 500, fontSize: 20 }}>
								{article.title}
							</p>
							<p>{article.description}</p>
						</div>
					</Col>
				);
			}
		}
		return array;
	}

	return (
		<Row style={{ maxWidth: 900 }}>
			<Cards />
		</Row>
	);
}

const articles = [
	{
		title: "Self-Collection",
		description:
			"Upon discharge, please collect the patient's medication from the pharmacy at level 1.",
	},
	{
		title: "Ward Collection",
		description:
			"The patient will receive the medication directly from the ward on discharge day.",
	},
	{
		title: "Pharmacist Consultation",
		description:
			"The pharmacist would like to speak to the patient's family members or caregiver. Medication will be delivered to ward.",
	},
];

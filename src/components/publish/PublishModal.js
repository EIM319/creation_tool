import { Button, Modal, Spinner } from "react-bootstrap";
import { addDoc, collection, doc, getDoc } from "firebase/firestore/lite";
import { useState } from "react";

export default function PublishModal({ show, setShow, userName, database }) {
	const [isSaving, setSaving] = useState(false);

	async function publish() {
		if (isSaving) return;
		setSaving(true);
		const data = await getUser(database, userName);
		data.date = new Date();
		const archiveRef = collection(
			database,
			"users/" + userName + "/archive"
		);
		await addDoc(archiveRef, data);
		var userToken = data.notificationKey;
		if (userToken === null || userToken === undefined) {
			setShow(false);
			setSaving(false);
			return;
		}
		const message = {
			notification: {
				title: "Care Synopsis Updated",
				body: "Your care synopsis has been updated.",
			},
			to: userToken,
		};
		await fetch("https://fcm.googleapis.com/fcm/send", {
			method: "POST",
			headers: {
				Authorization:
					"key=AAAA-fp04k4:APA91bGRXVM73uayUJ7pl85HQpomtql8WFar9pd9cEGopO98pS58BGVbFaV1E5Z47NPd1jz6P26TBzfbJ3P1PRdO7AJx5YPbLzo7Kz9-Kb62duMdckEGXQWmyn1v2pIIAEjhIjgQ0ACE",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(message),
		});
		setShow(false);
		setSaving(false);
	}

	return (
		<Modal
			show={show}
			onHide={() => {
				setShow(false);
			}}
			centered
		>
			<Modal.Header>
				<Modal.Title>Confirm Publish</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				Are you sure you want to publish now? Once published, patients
				will be able to see the updated information.
			</Modal.Body>
			<Modal.Footer>
				{isSaving ? (
					<Spinner animation="border" role="status" />
				) : (
					<>
						<Button
							variant="secondary"
							onClick={() => {
								setShow(false);
							}}
						>
							Cancel
						</Button>
						<Button onClick={publish}>Confirm</Button>
					</>
				)}
			</Modal.Footer>
		</Modal>
	);
}

async function getUser(database, userName) {
	const ref = doc(database, "users", userName);
	const result = await getDoc(ref);
	const data = result.data();
	const ref2 = doc(database, "notification", userName);
	const result2 = await getDoc(ref2);
	if (result2.exists()) {
		const data2 = result2.data();
		data.notificationKey = data2.notificationKey;
	}
	return data;
}

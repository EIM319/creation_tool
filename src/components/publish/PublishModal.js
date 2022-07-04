import { Button, Modal } from "react-bootstrap";
import { addDoc, collection, doc, getDoc } from "firebase/firestore/lite";

export default function PublishModal({ show, setShow, userName, database }) {
	async function publish() {
		const data = await getUser(database, userName);
		data.date = new Date();
		const archiveRef = collection(
			database,
			"users/" + userName + "/archive"
		);
		await addDoc(archiveRef, data);
		setShow(false);
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
				<Button
					variant="secondary"
					onClick={() => {
						setShow(false);
					}}
				>
					Cancel
				</Button>
				<Button onClick={publish}>Confirm</Button>
			</Modal.Footer>
		</Modal>
	);
}

async function getUser(database, userName) {
	const ref = doc(database, "users", userName);
	const result = await getDoc(ref);
	const data = result.data();
	return data;
}

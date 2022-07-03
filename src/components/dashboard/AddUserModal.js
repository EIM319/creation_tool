import { addDoc, collection, getDoc } from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { Button, FormControl, Modal, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

export default function AddUserModal({
	database,
	users,
	setUsers,
	open,
	setOpen,
}) {
	const [name, setName] = useState();
	const [isSaving, setSaving] = useState(false);

	useEffect(() => {
		setName("");
	}, [open]);

	async function createNew() {
		if (name.length <= 0) {
			toast.error("Please enter a name.");
			return;
		}
		if (isSaving) return;
		setSaving(true);
		const newUser = Object.assign({}, defaultUser);
		newUser.name = name;
		const ref = await addDoc(collection(database, "users"), newUser);
		const newItem = await getDoc(ref);
		setUsers([newItem, ...users]);
		setOpen(false);
		setSaving(false);
		toast.success("Patient Created");
	}

	return (
		<Modal
			show={open}
			onHide={() => {
				setOpen(false);
			}}
			centered
		>
			<Modal.Header>
				<Modal.Title>Add New User</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>What is the patient's name?</p>
				<FormControl
					value={name}
					onChange={(event) => setName(event.target.value)}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant="secondary"
					onClick={() => {
						setOpen(false);
					}}
				>
					Cancel
				</Button>
				{isSaving ? (
					<Spinner animation="border" role="status" />
				) : (
					<Button
						onClick={() => {
							createNew();
						}}
					>
						Confirm
					</Button>
				)}
			</Modal.Footer>
		</Modal>
	);
}

const defaultUser = {
	name: "",
	monitoring: [],
	medication: [],
	lab_result: [],
	caregiving: [],
	additional_notes: [],
};

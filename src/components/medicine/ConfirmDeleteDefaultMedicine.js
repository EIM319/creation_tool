import { Button, Modal } from "react-bootstrap";
import { deleteDoc } from "firebase/firestore/lite";
import { toast } from "react-toastify";

export default function ConfirmDeleteDefaultMedicineComponent({
	show,
	setShow,
	medication,
	setMedication,
	selectedMedicine,
	setSelectedMedicine,
}) {
	return (
		<Modal show={show} onHide={() => setShow(false)} centered>
			<Modal.Header closeButton>
				<Modal.Title> Confirm delete? </Modal.Title>
			</Modal.Header>
			<Modal.Body>
				Are you sure you want to delete this medicine?
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
				<Button
					variant="danger"
					onClick={async () => {
						setShow(false);
						const ref = selectedMedicine.ref;
						await deleteDoc(ref);
						setSelectedMedicine(undefined);
						setMedication(
							medication.filter((item) => item.ref !== ref)
						);
						toast.success("Medicine Deleted");
					}}
				>
					Confirm
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

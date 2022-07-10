import { Modal } from "react-bootstrap";

export default function PreviewModal({ user, show, setShow }) {
	return (
		<Modal
			size="xl"
			centered
			show={show}
			onHide={() => {
				setShow(false);
			}}
		>
			<Modal.Header closeButton>
				<Modal.Title>Preview</Modal.Title>
			</Modal.Header>
			<iframe
				src={"https://eim319.web.app/preview/" + user}
				style={{ height: "80vh" }}
			/>
		</Modal>
	);
}

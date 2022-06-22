import { Button, Modal } from "react-bootstrap";
import { deleteDoc } from "firebase/firestore/lite";
import { toast } from "react-toastify";

export default function ConfirmDeleteDefaultModal({
	show,
	setShow,
	articles,
	setArticles,
	setArticle,
	article,
}) {
	return (
		<Modal show={show} onHide={() => setShow(false)} centered>
			<Modal.Header closeButton>
				<Modal.Title>Confirm delete?</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				Are you sure you want to delete this article?
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
						const ref = article.ref;
						await deleteDoc(ref);
						setArticle(undefined);
						setArticles(
							articles.filter((item) => item.ref !== ref)
						);
						toast.success("Article Deleted");
					}}
				>
					Confirm
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

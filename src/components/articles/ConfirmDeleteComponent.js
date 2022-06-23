import { Button, Modal } from "react-bootstrap";
import { doc, updateDoc } from "firebase/firestore/lite";
import { toast } from "react-toastify";

export default function ConfirmDeleteComponent({
	show,
	setShow,
	database,
	userName,
	articles,
	setArticles,
	setArticle,
	article,
	type,
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
						const ref = doc(database, "users", userName);
						const index = articles.indexOf(article);
						if (index < 0) return;
						const newArticles = [...articles];
						newArticles.splice(index, 1);
						await updateDatabase(ref, type, newArticles).then(
							() => {
								setArticles(newArticles);
								if (newArticles.length > 0) {
									setArticle(newArticles[0]);
								} else {
									setArticle(undefined);
								}
								toast.success("Delete Successful");
							}
						);
					}}
				>
					Confirm
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

async function updateDatabase(ref, type, newArticles) {
	if (type === "monitoring") {
		await updateDoc(ref, {
			monitoring: newArticles,
		});
	} else if (type === "caregiving") {
		await updateDoc(ref, {
			caregiving: newArticles,
		});
	}
}

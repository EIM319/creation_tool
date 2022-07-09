import { Button, Modal } from "react-bootstrap";
import { doc, updateDoc } from "firebase/firestore/lite";

export default function ClearAllModal({
    show, 
    setShow, 
    database, 
    userName
}){
    return (
        <Modal
            show = {show}
            onHide={() => {
                setShow(false)
            }}
            centered
        >
            
            <Modal.Header>
                <Modal.Title>Clear All</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you would like to clear all entries in every section? 
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant = "secondary"
                    onClick={() => {
                        setShow(false);
                    }}
                >
                    Cancel
                </Button>
                <Button 
                    variant = "danger"
                    onClick = {async () => {
                        setShow(false); 
                        const ref = doc(database, "users", userName); 
                        const empty = [];
                        await updateDoc(ref, {
                            monitoring: empty,
                        });
                        await updateDoc(ref, {
                            caregiving: empty, 
                        });
                        await updateDoc(ref, {
                            lab_result: empty,
                        });
                        await updateDoc(ref, {
                            additional_notes: empty,
                        });
                    }}
                >
                    Confirm 
                </Button>
            </Modal.Footer>

        </Modal>
    );

}

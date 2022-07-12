import {Button, Modal} from "react-bootstrap"; 
import {doc, updateDoc} from "firebase/firestore/lite"; 
import {toast} from "react-toastify";

export default function ConfirmDeleteMedicineComponent({
    show, 
    setShow, 
    database, 
    userName, 
    medicines, 
    setMedication, 
    selectedMedicine
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
                    variant = "secondary"
                    onClick = {() => {
                        setShow(false);
                    }}
                >
                    Cancel
                </Button>
                <Button 
                    variant = "danger"
                    onClick = {async()=> {
                        setShow(false);
                        const ref = doc(database, "users", userName)
                        const index = medicines.indexOf(selectedMedicine); 
                        if (index<0) return;
                        const newMedication = [...medicines];
                        newMedication.splice(index, 1);
                        await updateDoc(ref, {
                            medication: newMedication,
                        }).then(
                            () => {
                                if (newMedication.length>0){
                                    setMedication(newMedication);
                                }
                                else{
                                    setMedication(undefined);
                                }
                                toast.success("Delete Successful")
                            }
                        )
                    }}
                >
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
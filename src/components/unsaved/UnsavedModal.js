import {Button, Modal} from "react-bootstrap"; 

export default function UnsavedModal({
    show, 
    setShow,
    unsavedChanges,
    
}){
    console.log(show)
    if (unsavedChanges){
        return(
            <Modal 
        centered
        >
            <Modal.Header>
                <Modal.Title>Unsaved Changes</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                This page contains unsaved changes. Are you sure you want to leave this page? 
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant = "secondary"
                    onClick = {() => {
                        setShow(false)
                    }}
                >
                    Yes
                </Button>
                <Button 
                    onClick = {() => {
                        setShow(false)
                 }}
                >
                    No
                </Button>
            </Modal.Footer>
        </Modal>
        )
    }
 }

import { Modal, Button } from 'react-bootstrap'


export default function ConfirmDeleteModal({ show, onClose, onConfirm, itemLabel = "this product" }) {
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Delete {itemLabel}?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                This action will call the API and return success, but data won’t persist (mock API). Proceed anyway?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button className="btn-cute" onClick={onConfirm}>Yes, delete</Button>
            </Modal.Footer>
        </Modal>
    )
}

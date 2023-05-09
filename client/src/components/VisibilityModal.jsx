import {Button, Modal} from "react-bootstrap";
import React from "react";

const VisibilityModal = ({show, handleClose, noteData, handleVisibility}) => {

	return (
			<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
				<Modal.Header>
					<Modal.Title className="mx-auto">Change Note Visibility</Modal.Title>
				</Modal.Header>
				<Modal.Body className="text-center fs-5">
					You are about to change the visibility of this note from <b>{noteData.is_public ? "public" : "private"}</b> to <b>{!noteData.is_public ? "public" : "private"}</b>.
					{!noteData.is_public ? <>
						<hr/>
						<div className="text-danger fw-bolder">Other users will be able to see your Note!</div>
					</> : <>
						<hr/>
						<div className="text-success fw-bolder">Other users won't be able to see your Note anymore!</div>
					</>}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="outline-warning" onClick={handleClose}>Close</Button>
					<Button variant="outline-primary" onClick={handleVisibility}>
						Make {!noteData.is_public ? "public" : "private"}
					</Button>
				</Modal.Footer>
			</Modal>
	);
}

export default VisibilityModal;
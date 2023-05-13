import {Button, Form, Modal} from "react-bootstrap";
import React, {useState} from "react";
import axios from "axios";

const EditNoteModal = ({show, handleClose, noteData, getData}) => {

	const [inputs, setInputs] = useState({title: noteData.title, body: noteData.body});
	const handleChanges = e => setInputs(prev => ({...prev, [e.target.name]: e.target.value}));

	const handleEdit = async e => {
		e.preventDefault();
		handleClose();
		try {
			await axios
					.put(`/api/notes/${noteData.id}`, {inputs, id: noteData.id});
			getData();
		} catch (err) {
			console.log(err);
		}
	}

	return (
			<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
				<Modal.Header>
					<Modal.Title className="mx-auto">Edit Note [ID: {noteData.id}]</Modal.Title>
				</Modal.Header>
				<Modal.Body className="text-center fs-5">
					<Form>
						<Form.Control as="textarea" name="title" placeholder="Title" id="title" value={inputs.title} onChange={handleChanges}/>
						<hr/>
						<Form.Control as="textarea" name="body" placeholder="Note" value={inputs.body} onChange={handleChanges}/>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="outline-warning" onClick={handleClose}>Close</Button>
					<Button variant="outline-primary" onClick={handleEdit}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
	);
}

export default EditNoteModal;
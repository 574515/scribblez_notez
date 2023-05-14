import {Button, Form, FormText, Modal} from "react-bootstrap";
import React, {useState} from "react";
import axios from "axios";

const EditProfileModal = ({getData, show, handleClose, userData, params}) => {

	const [inputs, setInputs] = useState({
		first_name: userData.first_name,
		last_name: userData.last_name,
		username: userData.username,
		email: userData.email,
		password: userData.password,
		is_anonymous: userData.is_anonymous,
		image: userData.image ? userData.image : ""
	});
	const [file, setFile] = useState(null);

	const upload = async () => {
		try {
			const formData = new FormData();
			formData.append("file", file);
			const res = await axios.post("/api/uploads", formData);
			return res.data;
		} catch (err) {
			console.log(err);
		}
	}

	const handleChanges = e => setInputs(prev => ({...prev, [e.target.name]: e.target.value}));

	const handleEdit = async e => {
		e.preventDefault();
		handleClose();
		const imgUrl = await upload();
		try {
			await axios
					.put(`/api/users/${userData.username}`, {inputs, username: userData.username, image: imgUrl.filename});
			getData();
		} catch (err) {
			console.log(err);
		}
	}

	const removeProfileImage = async e => {
		e.preventDefault();
		try {
			await axios
					.patch(`/api/users/${userData.username}/image`, params);
			getData();
		} catch (err) {
			console.log(err);
		}
	}

	return (
			<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
				<Modal.Header>
					<Modal.Title className="mx-auto">Edit Profile [{userData.username}]</Modal.Title>
				</Modal.Header>
				<Modal.Body className="text-center fs-5">
					<Form className="px-5 py-3" id="editProfileForm">
						<Form.Control className="mb-2" type="text" name="first_name" value={inputs.first_name} placeholder="First Name" onChange={handleChanges}/>
						<Form.Control className="mb-2" type="text" name="last_name" value={inputs.last_name} placeholder="Last Name" onChange={handleChanges}/>
						<Form.Control className="mb-2" type="text" name="username" value={inputs.username} placeholder="Username" disabled/>
						<Form.Control className="mb-2" type="text" name="email" value={inputs.email} placeholder="E-mail" disabled/>
						<Form.Control className="mb-2" type="file" name="image" accept="image/png" onChange={e => setFile(e.target.files[0])}/>
						<FormText id="removeImage">{(userData.image === "" || userData.image === null) ? "Profile picture not set." : <span onClick={removeProfileImage}>Remove image</span>}</FormText>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="outline-danger" onClick={handleClose}>
						Close
					</Button>
					<Button variant="outline-primary" onClick={handleEdit}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
	);
}
export default EditProfileModal;
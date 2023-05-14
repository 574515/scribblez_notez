import React, {useContext, useState} from 'react';
import {Button, Card, Form} from "react-bootstrap";
import axios from "axios";
import {AuthContext} from "../context/authContext";

const AddNote = ({getData}) => {

	const {currentUser} = useContext(AuthContext);
	const currentUserUsername = currentUser?.username;
	const inputsInitialSate = {title: "", body: ""};
	const [inputs, setInputs] = useState(inputsInitialSate);

	const handleChanges = e => setInputs(prev => ({...prev, [e.target.name]: e.target.value}));

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			await axios
					.post("/api/notes/", {inputs, currentUserUsername});
			getData();
			setInputs({title: "", body: ""});
		} catch (err) {
			console.log(err);
		}
	};

	const handleKeySubmit = (e) => {
		if (e.ctrlKey && e.keyCode === 13)
			handleSubmit(e).then();
	};

	return (
			<div className="addNoteWrapper row">
				<Card className="col-12 col-lg-8 col-xxl-4 py-5 px-3 mx-auto">
					<Card.Body>
						<Form>
							<Form.Control as="textarea" name="title" placeholder="Title" id="title" value={inputs.title} onChange={handleChanges} onKeyDown={handleKeySubmit}/>
							<hr/>
							<Form.Control as="textarea" name="body" placeholder="Note" value={inputs.body} onChange={handleChanges} onKeyDown={handleKeySubmit}/>
							<div className="row">
								<div className="col-12 col-lg-6 mx-auto">
									<Button variant="outline-primary" className="w-100 mx-auto mt-4" onClick={handleSubmit} disabled={inputs.body === "" && inputs.title === ""}>
										Submit
									</Button>
								</div>
								<div className="col-12 col-lg-6 mx-auto">
									<Button variant="outline-danger" className="w-100 mx-auto mt-4" onClick={() => setInputs(inputsInitialSate)} disabled={inputs.body === "" && inputs.title === ""}>
										Clear
									</Button>
								</div>
							</div>
						</Form>
					</Card.Body>
				</Card>
			</div>
	);
};

export default AddNote;